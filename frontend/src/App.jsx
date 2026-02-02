import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-xl font-semibold">
        HRMS Lite
      </header>

      <main className="p-6">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
