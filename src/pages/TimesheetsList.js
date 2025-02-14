import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTimesheet, getTimesheets } from "../api/timesheets";
import CalendarView from "./CalendarView";
import TableView from "./TableView";

const TimesheetsList = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [view, setView] = useState("table");

  useEffect(() => {
    loadTimesheets();
  }, []);

  const loadTimesheets = async () => {
    try {
      const data = await getTimesheets();
      console.log("Timesheets Data:", data);
      setTimesheets(data);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this timesheet?");
    if (!confirmDelete) return;

    try {
      await deleteTimesheet(id);
      setTimesheets(timesheets.filter((t) => t.id !== id));
      console.log(`Timesheet with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting timesheet:", error);
    }
  };

  return (
    <div className="container">
      <h1>Timesheets</h1>

      {/* Add Timesheet Button */}
      <div className="mb-4">
        <Link to="/timesheets/new" className="add-timesheet-btn">
          + Add Timesheet
        </Link>
      </div>

      {/* Toggle between views */}
      <div className="view-toggle">
        <button onClick={() => setView("table")} className={view === "table" ? "active" : "inactive"}>
          Table View
        </button>
        <button onClick={() => setView("calendar")} className={view === "calendar" ? "active" : "inactive"}>
          Calendar View
        </button>
      </div>

      {/* Pass handleDelete function to TableView */}
      {view === "table" ? <TableView timesheets={timesheets} onDelete={handleDelete} /> : <CalendarView timesheets={timesheets} />}
    </div>
  );
};

export default TimesheetsList;
