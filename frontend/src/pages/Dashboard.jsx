import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import AttendanceForm from "../components/AttendanceForm";
import DashboardCounts from "../components/DashboardCounts";

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* Top Summary */}
      <DashboardCounts />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Add Employee + Employee List */}
        <div className="space-y-6">
          <EmployeeForm />
          <EmployeeList />
        </div>

        {/* Right Column: Mark Attendance */}
        <AttendanceForm />
      </div>
    </div>
  );
}
