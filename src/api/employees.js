import axios from "axios";

const API_URL = "http://localhost:5070/api/employee";

export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createEmployee = async (formData) => {
  try {
    console.log("🔹 Sending Employee Data:", Object.fromEntries(formData.entries()));

    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 🔹 Ensure correct content type
      },
    });

    console.log("✅ Employee Created Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error Creating Employee:", error);
    if (error.response) {
      console.error("❌ Server Response:", error.response.data);
    }
    throw error;
  }
};

export const updateEmployee = async (id, formData) => {
  return await axios.put(`${API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
