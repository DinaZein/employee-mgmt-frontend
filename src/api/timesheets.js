import axios from "axios";

const API_URL = "http://localhost:5070/api/timesheet"; // Update with your backend port

export const getTimesheets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    throw error;
  }
};

export const getTimesheetById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching timesheet with id ${id}:`, error);
    throw error;
  }
};

export const createTimesheet = async (timesheet) => {
  try {
    const response = await axios.post(API_URL, timesheet);
    return response.data;
  } catch (error) {
    console.error("Error creating timesheet:", error);
    throw error;
  }
};

export const updateTimesheet = async (id, timesheet) => {
  try {
    await axios.put(`${API_URL}/${id}`, timesheet);
  } catch (error) {
    console.error("Error updating timesheet:", error);
    throw error;
  }
};

export const deleteTimesheet = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting timesheet:", error);
    throw error;
  }
};
