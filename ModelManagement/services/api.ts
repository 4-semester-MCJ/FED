import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost/api",
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Login
export const login = async (username: string, password: string) => {
  const response = await api.post("/login", { username, password });
  return response.data;
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