import React, { useEffect, useState } from "react";
import Button from "../components/buttons/standard_button";
import Table from "../components/table/table";
import type { Job } from "../interfaces/job";
import type { Model } from "../interfaces/model";
import { getAllJobs, getAllModels, addModelToJob, removeModelFromJob } from "../services/api";
import Modal from "../components/modal/modal";
import { AddModelButton } from "../components/buttons/AddModelButton";
import { RemoveModelButton } from "../components/buttons/RemoveModelButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserTie, faBriefcase } from '@fortawesome/free-solid-svg-icons';

const ManagerPage: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [models, setModels] = useState<Model[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [jobsData, modelsData] = await Promise.all([
					getAllJobs(),
					getAllModels()
				]);
				setJobs(jobsData);
				setModels(modelsData);
			} catch (error) {
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleModelAdded = async () => {
		try {
			const updatedJobs = await getAllJobs();
			setJobs(updatedJobs);
		} catch (error) {
			console.error("Error refreshing jobs:", error);
		}
	};

	const handleModelRemoved = async () => {
		try {
			const updatedJobs = await getAllJobs();
			setJobs(updatedJobs);
		} catch (error) {
			console.error("Error refreshing jobs:", error);
		}
	};

	const headers = [
		"Job ID",
		"Customer",
		"Location",
		"Start Date",
		"Duration",
		"Models",
		"Actions",
		"Comments",
	];

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	const formatModels = (models: Model[], jobId: number) => {
		if (!models || models.length === 0) {
			return <div className="bg-white py-2 text-gray-500 flex flex-col justify-center h-full">No models assigned</div>;
		}
		return (
			<div className="bg-white py-2 flex flex-col gap-1 shadow-sm justify-center h-full">
				{models.map((model) => (
					<div key={model.modelId} className="flex items-center w-full">
						<RemoveModelButton
							jobId={jobId}
							modelId={model.modelId}
							onModelRemoved={handleModelRemoved}
						/>
						<span className="text-gray-700 truncate pl-2 flex-1">{`${model.firstName} ${model.lastName}`}</span>
					</div>
				))}
			</div>
		);
	};

	const tableData = jobs.map((job) => {
		return [
			`#${job.jobId}`,
			job.customer,
			job.location,
			formatDate(job.startDate),
			`${job.days} day${job.days !== 1 ? "s" : ""}`,
			formatModels(job.models || [], job.jobId),
			<div key={job.jobId} className="flex items-center justify-center h-full min-h-[64px]">
				<AddModelButton
					jobId={job.jobId}
					onModelAdded={handleModelAdded}
					assignedModels={job.models}
				/>
			</div>,
			job.comments || "",
		];
	});


	return (
		<div className="p-6">
			<div className="flex justify-center gap-8 mb-10">
				<Button onClick={() => setIsModalOpen(true)}>
					<FontAwesomeIcon icon={faUserPlus} className="w-6 h-4 mr-2" />
					Ny model
				</Button>
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title="Ny Model"
				>
					<p>Modal Content</p>
				</Modal>
				<Button>
					<FontAwesomeIcon icon={faUserTie} className="w-4 h-4 mr-2" />
					Ny manager
				</Button>
				<Button>
					<FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 mr-2" />
					Opret nyt job
				</Button>
			</div>

			{loading ? (
				<div className="text-center">Loading...</div>
			) : jobs.length === 0 ? (
				<div className="text-center text-gray-500">No jobs found</div>
			) : (
				<div className="overflow-x-auto">
					<Table headers={headers} data={tableData} />
				</div>
			)}
		</div>
	);
};

export default ManagerPage;
