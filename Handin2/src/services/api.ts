import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
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
	const response = await api.post("/Models", modelData);
	return response.data;
};

export const createManager = async (managerData: any) => {
	const response = await api.post("/Managers", managerData);
	return response.data;
};

export const createJob = async (jobData: any) => {
	const response = await api.post("/Jobs", jobData);
	return response.data;
};

export const addModelToJob = async (jobId: number, modelId: number) => {
	console.log('Adding model to job:', { jobId, modelId });
	try {
		const response = await api.post(`/Jobs/${jobId}/model/${modelId}`);
		console.log('Add model response:', response.data);
		return response.data;
	} catch (error) {
		console.error('Add model error:', error);
		throw error;
	}
};

export const removeModelFromJob = async (jobId: number, modelId: number) => {
	console.log('Removing model from job:', { jobId, modelId });
	try {
		const response = await api.delete(`/Jobs/${jobId}/model/${modelId}`);
		console.log('Remove model response:', response.data);
		return response.data;
	} catch (error) {
		console.error('Remove model error:', error);
		throw error;
	}
};

export const getAllJobs = async () => {
	console.log('Fetching all jobs');
	try {
		const response = await api.get("/Jobs");
		console.log('Get jobs response:', response.data);
		return response.data;
	} catch (error) {
		console.error('Get jobs error:', error);
		throw error;
	}
};

export const getAllModels = async () => {
	console.log('Fetching all models');
	try {
		const response = await api.get("/models");
		console.log('Get models response:', response.data);
		return response.data;
	} catch (error) {
		console.error('Get models error:', error);
		throw error;
	}
};

// Model-specific actions
export const getMyJobs = async () => {
	const response = await api.get("/Jobs");
	return response.data;
};

export const addExpenseToJob = async (expenseData: any) => {
	const response = await api.post("/Expenses", {
		modelId: expenseData.modelId,
		jobId: expenseData.jobId,
		date: expenseData.date,
		text: expenseData.text,
		amount: expenseData.amount,
	});
	return response.data;
};
