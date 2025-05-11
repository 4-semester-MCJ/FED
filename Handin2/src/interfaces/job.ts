import type { Model } from "./model";

export interface Job {
	jobId: number;
	customer: string;
	startDate: string;
	days: number;
	location: string;
	comments: string;
	models: Model[];
}
