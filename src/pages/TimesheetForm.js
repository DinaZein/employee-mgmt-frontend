import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTimesheet, getTimesheetById, updateTimesheet } from "../api/timesheets";
import "../styles/style.css";
const TimesheetForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [timesheet, setTimesheet] = useState({
    employeeId: "",
    startTime: "",
    endTime: "",
    summary: "",
  });

  useEffect(() => {
    if (id) {
      loadTimesheet();
    }
  }, [id]);

  const loadTimesheet = async () => {
    try {
      console.log("Fetching timesheet with ID:", id);
      const data = await getTimesheetById(id);
      console.log("Timesheet Data:", data);

      if (!data || Object.keys(data).length === 0) {
        console.error("No timesheet found!");
        return;
      }

      setTimesheet(data);
    } catch (error) {
      console.error("Error fetching timesheet:", error);
    }
  };


  const handleChange = (e) => {
    setTimesheet({ ...timesheet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(timesheet.startTime);
    const end = new Date(timesheet.endTime);

    if (start >= end) {
      alert("Error: Start Time must be before End Time!");
      return;
    }

    try {
      if (id) {
        await updateTimesheet(id, timesheet);
      } else {
        await createTimesheet(timesheet);
      }

      navigate("/timesheets");
    } catch (error) {
      console.error("Error submitting timesheet:", error);
    }
  };



  return (
    <div className="timesheet-form-container">
      <div className="timesheet-card">
        <h1 className="timesheet-title">{id ? "Edit Timesheet" : "New Timesheet"}</h1>
        <form onSubmit={handleSubmit} className="timesheet-form">
          <label>Employee ID</label>
          <input name="employeeId" type="number" value={timesheet.employeeId} onChange={handleChange} required />

          <label>Start Time</label>
          <input name="startTime" type="datetime-local" value={timesheet.startTime} onChange={handleChange} required />

          <label>End Time</label>
          <input name="endTime" type="datetime-local" value={timesheet.endTime} onChange={handleChange} required />

          <label>Summary</label>
          <textarea name="summary" value={timesheet.summary} onChange={handleChange} />

          <button type="submit">{id ? "Update Timesheet" : "Create Timesheet"}</button>
        </form>
      </div>
    </div>
  );
};


export default TimesheetForm;
