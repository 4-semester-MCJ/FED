import axios, { AxiosError } from "axios";
import type { Model } from "../interfaces/model";

interface CreateModelData extends Omit<Model, "modelId" | "jobs"> {
	password: string;
}

interface CreateManagerData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface CreateJobData {
	customer: string;
	startDate: string;
	days: number;
	location: string;
	comments?: string;
}

interface ExpenseData {
	modelId: number;
	jobId: number;
	date: string;
	text: string;
	amount: number;
}

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

export const setAuthToken = (token: string) => {
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Login
export const login = async (email: string, password: string) => {
	const response = await api.post("Account/login", { email, password });
	return response.data;
};

// Manager-specific actions
export const createModel = async (modelData: CreateModelData) => {
	try {
		console.log("Sending model data:", modelData);
		const response = await api.post("/Models", modelData);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.error(
				"Error creating model:",
				error.response?.data || error.message
			);
		} else {
			console.error("Error creating model:", error);
		}
		throw error;
	}
};

export const createManager = async (managerData: CreateManagerData) => {
	const response = await api.post("/Managers", managerData);
	return response.data;
};

export const createJob = async (jobData: CreateJobData) => {
	const response = await api.post("/Jobs", jobData);
	return response.data;
};

export const getAllModels = async () => {
	const response = await api.get("/models");
	return response.data;
};

export const addModelToJob = async (jobId: number, modelId: number) => {
	const response = await api.post(`/Jobs/${jobId}/model/${modelId}`);
	return response.data;
};

export const removeModelFromJob = async (jobId: number, modelId: number) => {
	const response = await api.delete(`/Jobs/${jobId}/model/${modelId}`);
	return response.data;
};

export const getAllJobs = async () => {
	const response = await api.get("/Jobs");
	return response.data;
};

// Model-specific actions
export const getMyJobs = async () => {
	const response = await api.get("/Jobs");
	return response.data;
};

export const addExpenseToJob = async (expenseData: ExpenseData) => {
	const response = await api.post("/Expenses", {
		modelId: expenseData.modelId,
		jobId: expenseData.jobId,
		date: expenseData.date,
		text: expenseData.text,
		amount: expenseData.amount,
	});
	return response.data;
};
