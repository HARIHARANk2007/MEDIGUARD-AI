from typing import Dict

from .openfda_service import analyze_bleeding_risk
from .llm_service import analyze_regimen_with_llm


def analyze_regimen(payload, db=None) -> Dict[str, str]:
    """Minimal deterministic analyzer used for local testing.

    Replace this with real clinical logic or an AI service call.
    Supports payloads with `drugs` list or `drugA`/`drugB` fields.
    """
    raw_drugs = []
    if getattr(payload, 'drugs', None):
        raw_drugs = list(payload.drugs)
    else:
        # collect drugA/drugB if provided
        if getattr(payload, 'drugA', None):
            raw_drugs.append(payload.drugA)
        if getattr(payload, 'drugB', None):
            raw_drugs.append(payload.drugB)

    # Try dynamic LLM analysis first if API key is configured
    llm_result = analyze_regimen_with_llm(
        drugs=raw_drugs,
        age=getattr(payload, 'age', None),
        weight=getattr(payload, 'weight', None),
        kidney=getattr(payload, 'kidney', None),
        liver=getattr(payload, 'liver', None),
        pregnancy=getattr(payload, 'pregnancy', False),
        pediatric=getattr(payload, 'pediatric', False),
        geriatric=getattr(payload, 'geriatric', False),
        db=db,
    )

    if llm_result:
        return llm_result

    openfda_result = analyze_bleeding_risk(raw_drugs)
    if openfda_result:
        return openfda_result


    drugs = [d.lower() for d in (raw_drugs or []) if d]
    if len(drugs) < 2:
        return {
            "severity": "info",
            "message": "Provide at least two medications for interaction analysis.",
            "riskScore": 0,
            "explanation": "Not enough medications provided",
            "schedule": []
        }

    # example rule
    if 'atorvastatin' in drugs and 'clopidogrel' in drugs:
        return {
            "severity": "high",
            "message": "High-risk interaction: Clopidogrel may reduce efficacy of Atorvastatin via CYP pathways.",
            "riskScore": 80,
            "explanation": "CYP-mediated interaction may alter statin metabolism; monitor LFTs and consider dose adjustment.",
            "schedule": [
                {"drug": "Clopidogrel", "time": "Morning (8:00 AM)", "rationale": "Standard morning dosing to maintain antiplatelet effect throughout the day."},
                {"drug": "Atorvastatin", "time": "Bedtime (10:00 PM)", "rationale": "Statins have peak efficacy when administered in the evening/bedtime due to nocturnal cholesterol synthesis, and separates administration from Clopidogrel to avoid metabolization bottlenecks."}
            ]
        }

    if 'warfarin' in drugs and 'aspirin' in drugs:
        return {
            "severity": "high",
            "message": "High-risk interaction: Warfarin + Aspirin increases bleeding risk; review anticoagulation management.",
            "riskScore": 90,
            "explanation": "Concurrent antiplatelet and anticoagulant therapy significantly increases bleeding risk, especially in elderly patients.",
            "schedule": [
                {"drug": "Aspirin", "time": "Morning (8:00 AM)", "rationale": "Taken with breakfast to minimize GI upset."},
                {"drug": "Warfarin", "time": "Evening (6:00 PM)", "rationale": "Standard evening dosing to allow routine morning INR blood tests to guide same-day dose adjustments."}
            ]
        }

    if len(set(drugs)) != len(drugs):
        return {
            "severity": "info",
            "message": "Duplicate medications detected — please verify entries.",
            "riskScore": 10,
            "explanation": "Same drug listed more than once",
            "schedule": []
        }

    # Generic schedule generator fallback
    default_schedule = []
    for d in raw_drugs:
        d_title = d.title()
        if "statin" in d.lower() or d.lower() in ("atorvastatin", "simvastatin", "rosuvastatin"):
            default_schedule.append({"drug": d_title, "time": "Bedtime (10:00 PM)", "rationale": "Peak cholesterol synthesis occurs overnight; statins are best taken at bedtime."})
        elif "aspirin" in d.lower() or "ibuprofen" in d.lower():
            default_schedule.append({"drug": d_title, "time": "Morning (8:00 AM)", "rationale": "Take in the morning with food to reduce gastrointestinal irritation."})
        elif len(default_schedule) == 0:
            default_schedule.append({"drug": d_title, "time": "Morning (8:00 AM)", "rationale": "Administer in the morning to establish routine daily dosing."})
        else:
            default_schedule.append({"drug": d_title, "time": "Evening (6:00 PM)", "rationale": "Recommending evening dosing to space administration from other medications."})

    return {
        "severity": "low",
        "message": "No major interactions detected (mock analysis).",
        "riskScore": 5,
        "explanation": "No significant interaction rules matched in the mock analyzer.",
        "schedule": default_schedule
    }
