// src/components/AttendanceList.jsx
import { useEffect, useState } from "react";
import API from "../api/api";

export default function AttendanceList({ employeeId }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/attendance/${employeeId}`);
      setAttendance(res.data);
    } catch (err) {
      console.error(err);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, [employeeId]);

  const filteredAttendance = filterDate
    ? attendance.filter((a) => a.date === filterDate)
    : attendance;

  const totalPresent = filteredAttendance.filter(
    (a) => a.status === "Present"
  ).length;

  return (
    <div className="mt-4 bg-gray-50 p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Attendance for {employeeId}</h3>

      <div className="mb-2">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={() => setFilterDate("")}
          className="bg-gray-300 px-2 rounded"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <p>Loading attendance...</p>
      ) : filteredAttendance.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="w-full border text-center">
          <thead>
            <tr className="bg-gray-200">
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((a) => (
              <tr key={a.id} className="border-t">
                <td>{a.date}</td>
                <td
                  className={
                    a.status === "Present"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {a.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-2 font-semibold">
        Total Present Days: {totalPresent}
      </p>
    </div>
  );
}
