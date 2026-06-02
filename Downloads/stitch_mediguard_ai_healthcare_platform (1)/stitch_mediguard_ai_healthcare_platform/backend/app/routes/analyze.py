from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..models.schemas import AnalyzeRequest, AnalyzeResponse
from ..models.analysis_history import AnalysisHistory
from ..models.database import SessionLocal
from ..services.analyzer import analyze_regimen

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(payload: AnalyzeRequest, db: Session = Depends(get_db)):
    """Analyze a drug regimen and patient parameters.

    This is a minimal example — replace `analyze_regimen` with
    your production logic or call out to AI services.
    """
    out = analyze_regimen(payload)
    history_row = AnalysisHistory(
        drug_a=payload.drugA or (payload.drugs[0] if payload.drugs else None),
        drug_b=payload.drugB or (payload.drugs[1] if payload.drugs and len(payload.drugs) > 1 else None),
        severity=out.get("severity", "unknown"),
        risk_score=out.get("riskScore"),
        explanation=out.get("explanation"),
        sources=out.get("sources"),
    )
    db.add(history_row)
    db.commit()
    return AnalyzeResponse(**out)
