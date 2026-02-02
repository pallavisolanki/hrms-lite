import { useEffect, useState } from "react";
import API from "../api/api";
import AttendanceList from "./AttendanceList";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    if (selectedEmployee === id) setSelectedEmployee(null); // reset attendance view
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <div className="bg-white p-4 rounded shadow col-span-2">
      <h2 className="text-lg font-semibold mb-4">Employees</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e.employee_id} className="text-center border-t">
              <td>{e.employee_id}</td>
              <td>{e.full_name}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>
              <td>
                <button
                  onClick={() => setSelectedEmployee(e.employee_id)}
                  className="text-blue-600 mr-2"
                >
                  View Attendance
                </button>
                <button
                  onClick={() => deleteEmployee(e.employee_id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render AttendanceList */}
      {selectedEmployee && <AttendanceList employeeId={selectedEmployee} />}
    </div>
  );
}
