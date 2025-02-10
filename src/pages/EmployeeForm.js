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

  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (id) {
      loadEmployee();
    }
  }, [id]);

  const loadEmployee = async () => {
    const data = await getEmployeeById(id);

    const formatDate = (dateString) => {
      if (!dateString) return "";
      return dateString.split("T")[0];
    };

    setEmployee({
      ...data,
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
    });
  };


  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startDateObj = new Date(employee.startDate);
    const endDateObj = new Date(employee.endDate);

    if (employee.endDate && startDateObj > endDateObj) {
      alert("End date must be after start date.");
      return;
    }
    const updatedEmployee = {
      ...employee,
      salary: parseFloat(employee.salary)
    };
    const formData = new FormData();
    formData.append("name", updatedEmployee.name);
    formData.append("email", updatedEmployee.email);
    formData.append("phone", updatedEmployee.phone);
    formData.append("jobTitle", updatedEmployee.jobTitle);
    formData.append("department", updatedEmployee.department);
    formData.append("salary", updatedEmployee.salary);
    formData.append("startDate", updatedEmployee.startDate);
    formData.append("endDate", updatedEmployee.endDate);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      if (id) {
        await updateEmployee(id, formData);
      } else {
        await createEmployee(formData);
      }

      navigate("/employees");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response)
        alert("Bad Request: Employee ID mismatch.");
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };





  return (
    <div className="form-container">
      <h1 className="form-title">{id ? "Edit Employee" : "New Employee"}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" value={employee.name} onChange={handleChange} placeholder="Name" required className="input-field" />
        <input name="email" value={employee.email} onChange={handleChange} placeholder="Email" type="email" required className="input-field" />
        <input name="phone" value={employee.phone} onChange={handleChange} placeholder="Phone" required className="input-field" />
        <input name="jobTitle" value={employee.jobTitle} onChange={handleChange} placeholder="Job Title" required className="input-field" />
        <input name="department" value={employee.department} onChange={handleChange} placeholder="Department" required className="input-field" />
        <input name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" type="number" required className="input-field" />
        <input name="startDate" value={employee.startDate} onChange={handleChange} type="date" required className="input-field" />
        <input name="endDate" value={employee.endDate} onChange={handleChange} type="date" className="input-field" />

        {/* Profile Picture Upload */}
        <label className="file-label">Upload Profile Picture</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />

        <button type="submit" className="submit-btn">
          {id ? "Update Employee" : "Create Employee"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
