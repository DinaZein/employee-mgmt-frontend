import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const CalendarView = ({ timesheets }) => {
  const navigate = useNavigate();

  // Convert timesheets to calendar events
  const events = timesheets.map((t) => ({
    id: t.id,
    title: `Timesheet for ${t.employee?.name || "Unknown"}`,
    start: new Date(t.startTime),
    end: new Date(t.endTime),
  }));

  // Handle event click
  const handleSelectEvent = (event) => {
    navigate(`/timesheets/${event.id}`);
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent} // Add this line to enable clicking
      />
    </div>
  );
};

export default CalendarView;
