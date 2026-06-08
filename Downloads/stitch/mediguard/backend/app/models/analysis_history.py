from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, JSON, Text, Boolean

from .database import Base


class AnalysisHistory(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)
    drug_a = Column(String(255), nullable=True)
    drug_b = Column(String(255), nullable=True)
    severity = Column(String(50), nullable=False)
    risk_score = Column(Integer, nullable=True)
    sources = Column(JSON, nullable=True)
    explanation = Column(Text, nullable=True)
    hallucination_flagged = Column(Boolean, default=False, nullable=True)
    hallucination_warning = Column(Text, nullable=True)
    citations = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class DrugChunk(Base):
    __tablename__ = "drug_chunks"

    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(String(50), unique=True, index=True, nullable=False)
    drug_name = Column(String(255), index=True, nullable=False)
    chunk_text = Column(Text, nullable=False)
    embedding = Column(JSON, nullable=True)  # List of floats for the embedding vector