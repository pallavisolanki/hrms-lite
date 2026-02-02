import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Use DATABASE_URL from environment, fallback to SQLite locally
DATABASE_URL = os.environ.get("postgresql://hrms_db_axyk_user:fpyzrXONUSegd7CAkUELNvQjMVi0uaLi@dpg-d60cl38gjchc73a02a0g-a.virginia-postgres.render.com/hrms_db_axyk", "sqlite:///./hrms.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
