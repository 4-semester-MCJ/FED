import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",

});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Login
export const login = async (email: string, password: string) => {
    const response = await api.post("Account/login", { email, password });
    console.log("Axios response:", response); // Log hele responsen
    return response.data; // Returner token-strengen direkte
};
// Manager-specific actions
export const createModel = async (modelData: any) => {
  const response = await api.post("/models", modelData);
  return response.data;
};

export const createManager = async (managerData: any) => {
  const response = await api.post("/managers", managerData);
  return response.data;
};

export const createJob = async (jobData: any) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

export const addModelToJob = async (jobId: string, modelId: string) => {
  const response = await api.post(`/jobs/${jobId}/models`, { modelId });
  return response.data;
};

export const removeModelFromJob = async (jobId: string, modelId: string) => {
  const response = await api.delete(`/jobs/${jobId}/models/${modelId}`);
  return response.data;
};

export const getAllJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

// Model-specific actions
export const getMyJobs = async () => {
  const response = await api.get("/my-jobs");
  return response.data;
};

export const addExpenseToJob = async (jobId: string, expenseData: any) => {
  const response = await api.post(`/jobs/${jobId}/expenses`, expenseData);
  return response.data;
};