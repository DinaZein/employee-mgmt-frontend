import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/EmployeeList.css"; // Import CSS file

const API_URL = "http://localhost:5070/api/employee"; // Adjust if needed

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

  useEffect(() => {
    fetchEmployees();
  }, [searchTerm, currentPage]);

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}`, {
        params: {
          search: searchTerm,
          page: currentPage,
          pageSize: itemsPerPage,
        },
      });

      console.log("API Response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  // Delete Employee Function
  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployees(employees.filter((emp) => emp.id !== id)); // Update UI after deletion
      console.log(`Employee with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employees-container">
      <h1 className="employees-title">Employees</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="search-input"
      />

      {/* Add Employee Button */}
      <div className="add-button-container">
        <Link to="/employees/new" className="add-button">
          + Add Employee
        </Link>
      </div>

      {/* Employee List */}
      <div className="employee-list">
        {employees.length === 0 ? (
          <p className="no-employees">No employees found.</p>
        ) : (
          employees.map((employee) => (
            <div key={employee.id} className="employee-card">
              <Link to={`/employees/${employee.id}`} className="employee-link">
                #{employee.id} {employee.name} - {employee.jobTitle}
              </Link>
              <button
                className="delete-button"
                onClick={() => deleteEmployee(employee.id)} // Attach event handler
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          className={`page-button ${currentPage === totalPages ? "disabled" : ""}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeesList;
