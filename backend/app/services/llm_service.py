import os
import json
import re
import math
from typing import Dict, Any, List, Optional
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from dotenv import load_dotenv
from .openfda_service import _build_label_summary

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
print("API Key Found:", GEMINI_API_KEY is not None)

GEMINI_MODEL = "gemini-3.1-flash-lite"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"


def get_embedding(text: str) -> Optional[List[float]]:
    """Get text embedding using Gemini API text-embedding-004 model."""
    api_key = GEMINI_API_KEY
    if not api_key:
        return None
    url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "model": "models/text-embedding-004",
        "content": {"parts": [{"text": text}]}
    }
    req = Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")
    try:
        with urlopen(req, timeout=15) as response:
            resp_data = json.loads(response.read().decode("utf-8"))
            return resp_data.get("embedding", {}).get("values")
    except Exception as e:
        print(f"Error fetching embedding: {e}")
        return None


def retrieve_similar_chunks(query_text: str, db, top_k: int = 3) -> List[Dict[str, Any]]:
    """Retrieve top-k chunks from database matching query using cosine similarity.
    This emulates pgvector similarity search on the SQLite/PostgreSQL backend.
    """
    from ..models.analysis_history import DrugChunk

    if not db:
        return []

    # 1. Generate query embedding
    query_vector = get_embedding(query_text)

    # Fetch all chunks
    try:
        chunks = db.query(DrugChunk).all()
    except Exception as e:
        print(f"Error querying DrugChunk: {e}")
        return []

    if not chunks:
        return []

    if not query_vector:
        # Fallback to keyword search if embedding API fails
        results = []
        keywords = query_text.lower().split()
        for chunk in chunks:
            score = sum(1 for kw in keywords if kw in chunk.chunk_text.lower())
            results.append((chunk, score))
        results.sort(key=lambda x: x[1], reverse=True)
        return [
            {
                "source_id": c.source_id,
                "drug_name": c.drug_name,
                "chunk_text": c.chunk_text,
                "score": float(s)
            }
            for c, s in results[:top_k]
        ]

    # 2. Calculate cosine similarity
    def cosine_similarity(v1, v2):
        if not v1 or not v2 or len(v1) != len(v2):
            return 0.0
        dot = sum(a*b for a, b in zip(v1, v2))
        norm1 = math.sqrt(sum(a*a for a in v1))
        norm2 = math.sqrt(sum(b*b for b in v2))
        if norm1 == 0 or norm2 == 0:
            return 0.0
        return dot / (norm1 * norm2)

    scored_chunks = []
    for chunk in chunks:
        chunk_vector = chunk.embedding
        if chunk_vector:
            score = cosine_similarity(query_vector, chunk_vector)
        else:
            score = 0.0
        scored_chunks.append((chunk, score))

    scored_chunks.sort(key=lambda x: x[1], reverse=True)
    return [
        {
            "source_id": c.source_id,
            "drug_name": c.drug_name,
            "chunk_text": c.chunk_text,
            "score": float(score)
        }
        for c, score in scored_chunks[:top_k]
    ]


def analyze_regimen_with_llm(
    drugs: List[str],
    age: Optional[int] = None,
    weight: Optional[float] = None,
    kidney: Optional[str] = None,
    liver: Optional[str] = None,
    pregnancy: bool = False,
    pediatric: bool = False,
    geriatric: bool = False,
    db: Optional[Any] = None,
) -> Optional[Dict[str, Any]]:
    """Query Google Gemini API to analyze a drug regimen with RAG similarity context and physiology parameters."""
    api_key = GEMINI_API_KEY
    if not api_key:
        return None

    # 1. Fetch OpenFDA label summaries for context
    fda_evidence = []
    for drug in drugs:
        try:
            summary = _build_label_summary(drug)
            if summary and "warnings" in summary:
                warnings = summary["warnings"]
                warning_text = warnings[0] if isinstance(warnings, list) else str(warnings)
                fda_evidence.append(f"- FDA Label Warnings for {drug.title()}: {warning_text[:800]}")
        except Exception as e:
            print(f"Error fetching FDA label for {drug}: {e}")

    fda_context = "\n".join(fda_evidence) if fda_evidence else "- No specific FDA label warning evidence retrieved."

    # 2. Retrieve Similar Drug Chunks from Vector Store (RAG)
    query_text = " ".join(drugs)
    retrieved_chunks = retrieve_similar_chunks(query_text, db, top_k=3)
    rag_evidence = []
    for chunk in retrieved_chunks:
        rag_evidence.append(
            f"Source ID: {chunk['source_id']} (Drug: {chunk['drug_name'].upper()})\n"
            f"Context Text: {chunk['chunk_text']}"
        )
    rag_context = "\n\n".join(rag_evidence) if rag_evidence else "- No similar clinical chunks found in vector store database."

    # Prepare patient details text
    patient_info = []
    if age is not None:
        patient_info.append(f"- Age: {age} years")
    if weight is not None:
        patient_info.append(f"- Weight: {weight} kg")
    if kidney:
        patient_info.append(f"- Renal Function: {kidney}")
    if liver:
        patient_info.append(f"- Hepatic Function: {liver}")
    if pregnancy:
        patient_info.append("- Pregnancy/Lactation: Yes")
    if pediatric:
        patient_info.append("- Patient is pediatric (<18 years)")
    if geriatric:
        patient_info.append("- Patient is geriatric (>65 years)")

    patient_str = "\n".join(patient_info) if patient_info else "- Normal/Unspecified physiological parameters"

    prompt = f"""You are a clinical pharmacology AI assistant (Claude API equivalent).
Analyze the following drug regimen for drug-drug interactions and patient physiology compatibility using the provided context.

Drugs to analyze: {', '.join(drugs)}

Retrieved Vector Store Context Chunks (RAG):
{rag_context}

FDA OpenFDA Evidence Context:
{fda_context}

Patient Physiology Parameters:
{patient_str}

Please perform a concise clinical interaction analysis. Consider how the patient's parameters impact safety and efficacy.

Citing Source Chunks:
- You MUST ground your explanation in the retrieved vector store context chunks.
- For every clinical claim you make, you MUST cite the relevant source ID (e.g. [REF-WF-01]) from the Retrieved Vector Store Context Chunks.
- Include a list of cited source IDs in the 'citations' array of your JSON response.

Clinical Administration Schedule:
- Provide a recommended daily schedule for administering each drug in the regimen.
- Choose from these times: "Morning (8:00 AM)", "Noon (12:00 PM)", "Evening (6:00 PM)", "Bedtime (10:00 PM)".
- Separate medications if they have absorption or competitive binding conflicts (e.g. calcium/antibiotics, iron, antacids). 
- Schedule statins at bedtime (standard efficacy) and diuretics in the morning, etc.
- In the JSON response, include a 'schedule' array with objects containing 'drug', 'time', and 'rationale' for each drug.

You MUST respond with a single, valid JSON object containing exactly the following keys (do not include any markdown wrapping or text outside the JSON):
{{
  "severity": "Severe" | "High" | "Moderate" | "Minor" | "Low" | "Safe",
  "message": "A concise (1-2 sentences) summary of the primary clinical concern or safety status.",
  "riskScore": An integer from 0 (completely safe) to 100 (critical risk),
  "explanation": "A concise clinical explanation. You must cite source IDs (e.g. [REF-WF-01]) inline where appropriate.",
  "citations": ["REF-WF-01", "REF-ASP-01"],
  "sources": [
    {{
      "drug": "Name of Drug",
      "section": "Description of warning or source section"
    }}
  ],
  "schedule": [
    {{
      "drug": "Name of Drug",
      "time": "Morning (8:00 AM)" | "Noon (12:00 PM)" | "Evening (6:00 PM)" | "Bedtime (10:00 PM)",
      "rationale": "Clinical reason for this timing recommendation"
    }}
  ]
}}"""

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.2,
            "responseSchema": {
                "type": "OBJECT",
                "properties": {
                    "severity": {"type": "STRING", "enum": ["Severe", "High", "Moderate", "Minor", "Low", "Safe"]},
                    "message": {"type": "STRING"},
                    "riskScore": {"type": "INTEGER"},
                    "explanation": {"type": "STRING"},
                    "citations": {
                        "type": "ARRAY",
                        "items": {"type": "STRING"}
                    },
                    "sources": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "drug": {"type": "STRING"},
                                "section": {"type": "STRING"}
                            },
                            "required": ["drug", "section"]
                        }
                    },
                    "schedule": {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "drug": {"type": "STRING"},
                                "time": {"type": "STRING"},
                                "rationale": {"type": "STRING"}
                            },
                            "required": ["drug", "time", "rationale"]
                        }
                    }
                },
                "required": ["severity", "message", "riskScore", "explanation", "sources", "citations", "schedule"]
            }
        }
    }

    url = f"{GEMINI_API_URL}?key={api_key}"
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "MediGuard-AI/1.0"
    }

    req = Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method="POST")

    try:
        with urlopen(req, timeout=90) as response:
            resp_data = json.loads(response.read().decode("utf-8"))

            candidates = resp_data.get("candidates", [])
            if not candidates:
                return None

            content_text = candidates[0].get("content", {}).get("parts", [])[0].get("text", "")
            if not content_text:
                return None

            result = json.loads(content_text.strip())

            # 3. Patient-Specific Risk Scoring Modifier
            drug_set = {d.lower().strip() for d in drugs if d}
            if "warfarin" in drug_set and "aspirin" in drug_set:
                base_risk = 72
            elif "atorvastatin" in drug_set and "clopidogrel" in drug_set:
                base_risk = 55
            else:
                base_risk = result.get("riskScore", 50)

            risk = base_risk
            if age is not None and age > 65:
                risk += 10
            kidney_val = (kidney or "normal").lower().strip()
            if kidney_val in ("moderate", "severe"):
                risk += 15
            liver_val = (liver or "normal").lower().strip()
            if liver_val in ("mild", "severe"):
                risk += 10

            final_risk = min(max(risk, 0), 100)
            result["riskScore"] = final_risk

            # Update severity based on final riskScore
            if final_risk >= 85:
                result["severity"] = "Severe"
            elif final_risk >= 70:
                result["severity"] = "High"
            elif final_risk >= 40:
                result["severity"] = "Moderate"
            elif final_risk >= 15:
                result["severity"] = "Minor"
            else:
                result["severity"] = "Low"

            # 4. Hallucination Guardrail Check
            retrieved_ids = {c["source_id"] for c in retrieved_chunks}
            cited_ids = set(result.get("citations", []))
            inline_citations = set(re.findall(r'\[(REF-[A-Z0-9-]+)\]', result.get("explanation", "")))

            invalid_citations = cited_ids - retrieved_ids
            invalid_inline = inline_citations - retrieved_ids

            hallucinated = False
            hallucination_warning = None

            if invalid_citations or invalid_inline:
                hallucinated = True
                hallucination_warning = f"Warning: Hallucinated citations detected. Citing sources not present in retrieved context: {list(invalid_citations | invalid_inline)}"
            elif result.get("severity") in ("Severe", "High", "Moderate") and not cited_ids and not inline_citations:
                hallucinated = True
                hallucination_warning = "Warning: Claims are uncited. High/moderate risk was flagged but no source ID was cited from retrieved context."

            result["hallucination_flagged"] = hallucinated
            result["hallucination_warning"] = hallucination_warning

            # If no manual sources returned, map the RAG chunks to the sources view
            if not result.get("sources") and retrieved_chunks:
                result["sources"] = [
                    {"drug": c["drug_name"].title(), "section": f"RAG Vector Chunk ({c['source_id']})"}
                    for c in retrieved_chunks
                ]

            # 5. Evidence / Confidence Level Calculation based on RAG cosine similarity
            max_score = 0.0
            if retrieved_chunks:
                scores = [float(c.get("score", 0.0)) for c in retrieved_chunks]
                if scores:
                    max_score = max(scores)
            
            if max_score >= 0.70:
                evidence_level = "High"
            elif max_score >= 0.45:
                evidence_level = "Medium"
            else:
                evidence_level = "Low"
            
            result["evidence_level"] = evidence_level
            result["evidence_score"] = float(round(max_score, 3))

            return result
    except HTTPError as e:
        print(f"LLM Service HTTP Error: {e.code} {e.reason}")
        return None
    except Exception as e:
        print(f"LLM Service Error: {e}")
        return None
