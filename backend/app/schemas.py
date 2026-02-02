from datetime import date
from pydantic import BaseModel


# -------- Attendance --------
class AttendanceBase(BaseModel):
    date: date
    status: str


class AttendanceCreate(AttendanceBase):
    employee_id: str


class AttendanceResponse(AttendanceBase):
    id: int
    employee_id: str

    class Config:
        from_attributes = True


# -------- Employee --------
class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: str
    department: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int
    attendance_records: list[AttendanceResponse] = []

    class Config:
        from_attributes = True
