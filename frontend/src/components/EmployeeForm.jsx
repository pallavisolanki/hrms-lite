import { useState } from "react";
import API from "../api/api";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setLoading(true);
    setError("");

    try {
      await API.post("/employees/", form);
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      alert("Employee added");
    } catch (err) {
      setError(err.response?.data?.detail || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>

      {["employee_id", "full_name", "email", "department"].map((field) => (
        <input
          key={field}
          placeholder={field.replace("_", " ").toUpperCase()}
          className="border p-2 w-full mb-2"
          value={form[field]}
          onChange={(e) =>
            setForm({ ...form, [field]: e.target.value })
          }
        />
      ))}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </div>
  );
}
