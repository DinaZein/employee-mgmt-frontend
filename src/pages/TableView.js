import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const TableView = ({ timesheets, onDelete }) => {
  if (!timesheets || timesheets.length === 0) {
    return <p className="text-gray-600 text-center">No timesheets found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((t) => (
            <tr key={t.id}>
              <td>{t.employeeId}</td>
              <td>{new Date(t.startTime).toLocaleString()}</td>
              <td>{new Date(t.endTime).toLocaleString()}</td>
              <td>{t.summary}</td>
              <td className="actions">
                <Link to={`/timesheets/${t.id}`} className="edit-btn">
                  Edit
                </Link>
                <button className="delete-btn" onClick={() => onDelete(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
