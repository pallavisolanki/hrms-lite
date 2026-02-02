import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use DATABASE_URL from environment, fallback to SQLite locally
DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./hrms.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
