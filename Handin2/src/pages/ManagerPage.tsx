import React, { useEffect, useState } from "react";
import Button from "../components/buttons/standard_button";
import Table from "../components/table/table";
import type { Job } from "../interfaces/job";
import type { Model } from "../interfaces/model";
import { getAllJobs } from "../services/api";
import Modal from "../components/modal/modal";

const ManagerPage: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const data = await getAllJobs();
				console.log("API Response:", data);
				setJobs(data);
			} catch (error) {
				console.error("Error fetching jobs:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchJobs();
	}, []);

	const headers = [
		"Job ID",
		"Customer",
		"Location",
		"Start Date",
		"Duration",
		"Models",
		"Comments",
	];

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	const formatModels = (models: Model[]) => {
		return models
			.map((model) => `${model.firstName} ${model.lastName}`)
			.join(", ");
	};

	const tableData = jobs.map((job) => [
		`#${job.jobId}`,
		job.customer,
		job.location,
		formatDate(job.startDate),
		`${job.days} day${job.days !== 1 ? "s" : ""}`,
		formatModels(job.models),
		job.comments,
	]);

	return (
		<div className="p-6">
			<div className="flex justify-center gap-8 mb-10">
				<Button onClick={() => setIsModalOpen(true)}>Ny model</Button>
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title="Ny Model"
				>
					{}
					<p>Modal Content</p>
				</Modal>
				<Button>Ny manager</Button>
				<Button>Opret nyt job</Button>
			</div>

			{loading ? (
				<div className="text-center">Loading...</div>
			) : (
				<Table headers={headers} data={tableData} />
			)}
		</div>
	);
};

export default ManagerPage;
