import { useEffect, useState } from "react";
import API from "../api/api";

export default function AttendanceList({ employeeId }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAttendance = async () => {
    if (!employeeId) return;
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

  if (!employeeId) return null;
  if (loading) return <p>Loading attendance...</p>;
  if (attendance.length === 0) return <p>No attendance records found.</p>;

  return (
    <div className="bg-white p-4 rounded shadow mt-4 col-span-2">
      <h2 className="text-lg font-semibold mb-2">
        Attendance for {employeeId}
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((rec, idx) => (
            <tr key={idx} className="text-center border-t">
              <td className="p-2">{new Date(rec.date).toLocaleDateString()}</td>
              <td className="p-2">{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
