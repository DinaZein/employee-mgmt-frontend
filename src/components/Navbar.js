import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Employee Management</h1>
        <div className="navbar-links">
          <Link to="/employees" className="nav-link">Employees</Link>
          <Link to="/timesheets" className="nav-link">Timesheets</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
