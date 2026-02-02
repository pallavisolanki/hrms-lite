// src/components/DashboardCounts.jsx
import { useEffect, useState } from "react";
import API from "../api/api";

export default function DashboardCounts() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCounts = async () => {
    setLoading(true);
    try {
      const resEmp = await API.get("/employees/");
      const employees = resEmp.data;
      setTotalEmployees(employees.length);

      // Fetch attendance for all employees in parallel
      const attendancePromises = employees.map((emp) =>
        API.get(`/attendance/${emp.employee_id}`)
      );

      const attendanceResults = await Promise.all(attendancePromises);

      let attendanceCount = 0;
      let presentCount = 0;

      attendanceResults.forEach((res) => {
        attendanceCount += res.data.length;
        presentCount += res.data.filter((a) => a.status === "Present").length;
      });

      setTotalAttendance(attendanceCount);
      setTotalPresent(presentCount);
    } catch (err) {
      console.error("Error loading dashboard counts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  if (loading) return <p>Loading dashboard counts...</p>;

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-gray-500">Total Employees</h2>
        <p className="text-2xl font-bold">{totalEmployees}</p>
      </div>

      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-gray-500">Total Attendance Records</h2>
        <p className="text-2xl font-bold">{totalAttendance}</p>
      </div>

      <div className="bg-white p-4 rounded shadow text-center">
        <h2 className="text-gray-500">Total Present Days</h2>
        <p className="text-2xl font-bold">{totalPresent}</p>
      </div>
    </div>
  );
}
