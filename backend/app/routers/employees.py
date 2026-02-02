from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas

router = APIRouter(prefix="/employees", tags=["Employees"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_employee(emp: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Employee).filter(
        models.Employee.employee_id == emp.employee_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")

    new_emp = models.Employee(**emp.dict())
    db.add(new_emp)
    db.commit()
    return {"message": "Employee added successfully"}

@router.get("/")
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()

@router.delete("/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Employee deleted"}
