from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas

router = APIRouter(prefix="/attendance", tags=["Attendance"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def mark_attendance(data: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    record = models.Attendance(**data.dict())
    db.add(record)
    db.commit()
    return {"message": "Attendance marked"}

@router.get("/{employee_id}")
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()
