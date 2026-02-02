HRMS Lite
Human Resource Management System (Lite)

HRMS Lite is a lightweight Human Resource Management System built for learning, demos, and small internal tools.
It supports basic employee management, attendance tracking, and dashboard statistics using a FastAPI backend and a React (Vite) frontend.

The project follows a clean full-stack architecture and is ideal for beginner to intermediate developers.

✨ Key Features

Add, view, and delete employees

Mark and view employee attendance

Dashboard with employee and attendance counts

REST API built using FastAPI

Modern frontend using React + Vite

🛠 Tech Stack
Frontend

React (Vite)

JavaScript

Axios

CSS / Tailwind-ready

Backend

Python 3.12

FastAPI

SQLAlchemy

SQLite (local database)

Uvicorn

📁 Project Structure
HRMS-Lite
├── backend
│   ├── app
│   │   ├── routers
│   │   │   ├── employees.py
│   │   │   └── attendance.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── hrms.db
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   │   └── api.js
│   │   ├── components
│   │   │   ├── AttendanceForm.jsx
│   │   │   ├── AttendanceList.jsx
│   │   │   ├── DashboardCounts.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeList.jsx
│   │   ├── pages
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md


▶️ Running the Project Locally
Prerequisites

Node.js 18+

Python 3.12+

pip and virtual environment support

🔙 Backend Setup
cd backend

Create and activate virtual environment

Windows

python -m venv venv
venv\Scripts\activate


macOS / Linux

python -m venv venv
source venv/bin/activate

Install dependencies
pip install -r requirements.txt

Start FastAPI server
uvicorn app.main:app --reload

API documentation
http://127.0.0.1:8000/docs

🔜 Frontend Setup
cd frontend
npm install

Environment Variables

Create a .env.local file inside the frontend folder:

VITE_API_URL=http://127.0.0.1:8000

Start development server
npm run dev

Open browser
http://localhost:5173

⚠️ Assumptions & Limitations

No authentication or role-based access

All users can perform all actions

Employee deletion is permanent

Attendance depends on employee existence

SQLite used for simplicity

Not optimized for large-scale production use

🚀 Future Improvements

Authentication and authorization

Role-based access (Admin / HR / Employee)

Pagination and search

Date-wise attendance filtering

PostgreSQL integration

Production deployment

👩‍💻 Author

Pallavi Solanki
Full-stack learning project using FastAPI and React (Vite)
