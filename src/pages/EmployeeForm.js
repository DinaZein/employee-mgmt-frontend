import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployeeById, updateEmployee } from "../api/employees";
import "../styles/style.css";

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    department: "",
    salary: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      loadEmployee();
    }
  }, [id]);

  const loadEmployee = async () => {
    const data = await getEmployeeById(id);

    setEmployee({
      ...data,
      startDate: data.startDate ? data.startDate.split("T")[0] : "", // Extract YYYY-MM-DD
      endDate: data.endDate ? data.endDate.split("T")[0] : "", // Extract YYYY-MM-DD
    });
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateEmployee(id, employee);
    } else {
      await createEmployee(employee);
    }
    navigate("/employees");
  };

  return (
    <div className="form-container">
      <h1 className="form-title">{id ? "Edit Employee" : "New Employee"}</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={employee.name} onChange={handleChange} placeholder="Name" required className="input-field" />
        <input name="email" value={employee.email} onChange={handleChange} placeholder="Email" type="email" required className="input-field" />
        <input name="phone" value={employee.phone} onChange={handleChange} placeholder="Phone" required className="input-field" />
        <input name="jobTitle" value={employee.jobTitle} onChange={handleChange} placeholder="Job Title" required className="input-field" />
        <input name="department" value={employee.department} onChange={handleChange} placeholder="Department" required className="input-field" />
        <input name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" type="number" required className="input-field" />
        <input name="startDate" value={employee.startDate} onChange={handleChange} type="date" required className="input-field" />
        <input name="endDate" value={employee.endDate} onChange={handleChange} type="date" className="input-field" />
        <button type="submit" className="submit-btn">
          {id ? "Update Employee" : "Create Employee"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
