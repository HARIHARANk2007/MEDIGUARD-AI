from sqlalchemy import create_engine
from sqlalchemy import inspect
from sqlalchemy.orm import declarative_base, sessionmaker


DATABASE_URL = "sqlite:///./analysis_history.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def initialize_database() -> None:
	from .analysis_history import AnalysisHistory

	expected_columns = {
		"id",
		"drug_a",
		"drug_b",
		"severity",
		"risk_score",
		"sources",
		"explanation",
		"created_at",
	}

	inspector = inspect(engine)
	if inspector.has_table(AnalysisHistory.__tablename__):
		existing_columns = {column["name"] for column in inspector.get_columns(AnalysisHistory.__tablename__)}
		if existing_columns != expected_columns:
			Base.metadata.drop_all(bind=engine, tables=[AnalysisHistory.__table__])

	Base.metadata.create_all(bind=engine)