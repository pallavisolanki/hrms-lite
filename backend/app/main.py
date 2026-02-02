from fastapi import FastAPI
from app.database import Base, engine
from app.routers import employees, attendance
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # optional for favicon

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(employees.router)
app.include_router(attendance.router)

# ✅ Root route
@app.get("/")
def root():
    return {"message": "Welcome to HRMS Lite Backend!"}

# Optional: serve favicon to avoid 404
# app.mount("/static", StaticFiles(directory="static"), name="static")
