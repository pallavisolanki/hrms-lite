import { useState } from "react";
import API from "../api/api";

export default function AttendanceForm({ onSubmitSuccess }) { // optional callback
  const [data, setData] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!data.employee_id || !data.date) {
      setError("Employee ID and Date are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await API.post("/attendance/", data);
      alert("Attendance marked");
      setData({ employee_id: "", date: "", status: "Present" });

      if (onSubmitSuccess) onSubmitSuccess(data.employee_id); // refresh attendance if needed
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Mark Attendance</h2>

      <input
        placeholder="Employee ID"
        className="border p-2 w-full mb-2"
        value={data.employee_id}
        onChange={(e) => setData({ ...data, employee_id: e.target.value })}
      />

      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={data.date}
        onChange={(e) => setData({ ...data, date: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2"
        value={data.status}
        onChange={(e) => setData({ ...data, status: e.target.value })}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={submit}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
