import os
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import declarative_base, sessionmaker

# Phase 8 — PostgreSQL support
# Set DATABASE_URL env var to a postgres:// connection string for production.
# Falls back to SQLite for local development when env var is not set.
_raw_url = os.getenv("DATABASE_URL", "sqlite:///./analysis_history.db")

# Heroku / Railway export postgres:// but SQLAlchemy 1.4+ requires postgresql://
if _raw_url.startswith("postgres://"):
    _raw_url = _raw_url.replace("postgres://", "postgresql://", 1)

DATABASE_URL = _raw_url
_is_sqlite = DATABASE_URL.startswith("sqlite")

_connect_args = {"check_same_thread": False} if _is_sqlite else {}

engine = create_engine(DATABASE_URL, connect_args=_connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def initialize_database() -> None:
    from .analysis_history import AnalysisHistory, DrugChunk

    expected_columns = {
        "id", "drug_a", "drug_b", "severity",
        "risk_score", "sources", "explanation", "created_at",
        "hallucination_flagged", "hallucination_warning", "citations",
    }

    inspector = inspect(engine)
    if inspector.has_table(AnalysisHistory.__tablename__):
        existing_columns = {col["name"] for col in inspector.get_columns(AnalysisHistory.__tablename__)}
        if existing_columns != expected_columns:
            Base.metadata.drop_all(bind=engine, tables=[AnalysisHistory.__table__])

    Base.metadata.create_all(bind=engine)

    # Seeding drug chunks for pgvector/RAG emulation
    db = SessionLocal()
    try:
        if db.query(DrugChunk).count() == 0:
            print("[MediGuard] Seeding drug interaction chunks for RAG vector similarity database...")
            seed_data = [
                {
                    "source_id": "REF-WF-01",
                    "drug_name": "warfarin",
                    "chunk_text": "Warfarin is an oral anticoagulant that acts as a vitamin K antagonist. It prevents the synthesis of clotting factors II, VII, IX, and X. Concomitant administration of antiplatelet agents like aspirin or nonsteroidal anti-inflammatory drugs (NSAIDs) like ibuprofen increases bleeding risk by multiple mechanisms: direct gastric mucosal damage and dual pathway platelet function inhibition. Bleeding complications can be severe and life-threatening."
                },
                {
                    "source_id": "REF-ASP-01",
                    "drug_name": "aspirin",
                    "chunk_text": "Aspirin is an antiplatelet agent and nonsteroidal anti-inflammatory drug (NSAID). It causes irreversible inhibition of platelet cyclooxygenase-1 (COX-1), blocking thromboxane A2. Combining aspirin with oral anticoagulants such as warfarin significantly elevates gastrointestinal and systemic bleeding risks, requiring careful monitoring of prothrombin time (PT/INR) and clinical signs of bleeding."
                },
                {
                    "source_id": "REF-CLO-01",
                    "drug_name": "clopidogrel",
                    "chunk_text": "Clopidogrel is an antiplatelet drug that is a prodrug requiring bioactivation by cytochrome P450 enzymes in the liver, primarily CYP2C19. Competitive substrates or inhibitors of CYP3A4 such as atorvastatin or simvastatin can interfere with clopidogrel metabolism. This metabolic bottleneck may reduce the active metabolite of clopidogrel and lower its antiplatelet therapeutic efficacy, risking thrombotic events."
                },
                {
                    "source_id": "REF-ATO-01",
                    "drug_name": "atorvastatin",
                    "chunk_text": "Atorvastatin is a HMG-CoA reductase inhibitor (statin) used for hypercholesterolemia. It is highly metabolized by the cytochrome P450 3A4 (CYP3A4) enzyme. When co-administered with other substrates or inhibitors of the CYP3A4 pathway (such as clopidogrel), statin plasma levels can increase significantly. This increases the incidence of statin-induced myotoxicity, myalgia, and in rare cases, rhabdomyolysis."
                },
                {
                    "source_id": "REF-LIS-01",
                    "drug_name": "lisinopril",
                    "chunk_text": "Lisinopril is an angiotensin-converting enzyme (ACE) inhibitor. Co-administration of NSAIDs like ibuprofen can reduce its antihypertensive effect by inhibiting vasodilator prostaglandins. Furthermore, in patients who are elderly, volume-depleted, or have compromised renal function, co-administration of Lisinopril and ibuprofen may result in severe deterioration of renal function, including acute kidney injury."
                },
                {
                    "source_id": "REF-IBU-01",
                    "drug_name": "ibuprofen",
                    "chunk_text": "Ibuprofen is a non-selective NSAID that inhibits COX-1 and COX-2. It causes systemic vasoconstriction and sodium/water retention in the kidneys. This renal prostaglandin inhibition opposes the therapeutic action of ACE inhibitors like lisinopril and can precipitate acute renal decompensation. Monitoring renal panels and blood pressure is recommended during co-therapy."
                }
            ]

            # Import get_embedding locally to avoid circular dependencies
            from ..services.llm_service import get_embedding

            for item in seed_data:
                vector = get_embedding(item["chunk_text"])
                if not vector:
                    import hashlib
                    h = hashlib.sha256(item["chunk_text"].encode("utf-8")).digest()
                    vector = [float(b) / 255.0 for b in h[:128]]  # Fallback 128-dim vector

                chunk = DrugChunk(
                    source_id=item["source_id"],
                    drug_name=item["drug_name"],
                    chunk_text=item["chunk_text"],
                    embedding=vector
                )
                db.add(chunk)
            db.commit()
            print("[MediGuard] Vector store seeding complete.")
    except Exception as e:
        print(f"[MediGuard] Error seeding database: {e}")
    finally:
        db.close()

    db_type = "SQLite" if _is_sqlite else "PostgreSQL"
    print(f"[MediGuard] Database initialised ({db_type}): {DATABASE_URL[:60]}...")