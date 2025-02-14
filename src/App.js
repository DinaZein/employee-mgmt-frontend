import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeeForm from "./pages/EmployeeForm";
import EmployeesList from "./pages/EmployeesList";
import TimesheetForm from "./pages/TimesheetForm";
import TimesheetsList from "./pages/TimesheetsList";
import "./styles/style.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Default redirect when visiting '/' */}
          <Route path="/" element={<Navigate to="/employees" />} />

          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeForm />} />
          <Route path="/timesheets" element={<TimesheetsList />} />
          <Route path="/timesheets/new" element={<TimesheetForm />} />
          <Route path="/timesheets/:id" element={<TimesheetForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
