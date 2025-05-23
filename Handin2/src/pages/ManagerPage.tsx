import React, { useEffect, useState } from "react";
import Button from "../components/buttons/standard_button";
import Table from "../components/table/table";
import type { Job } from "../interfaces/job";
import type { Model } from "../interfaces/model";
import { getAllJobs, createModel } from "../services/api";
import Modal from "../components/modal/modal";
import { AddModelButton } from "../components/buttons/AddModelButton";
import { RemoveModelButton } from "../components/buttons/RemoveModelButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faUserTie,
	faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import AddJobModal from "../components/modal/addJobModal";
import ManagerModal from "../components/modal/managerModal";

const ManagerPage: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModelModalOpen, setIsModelModalOpen] = useState(false);
	const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
	const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
	const [modelData, setModelData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNo: "",
		addressLine1: "",
		addressLine2: "",
		zip: "",
		city: "",
		country: "",
		birthDate: "",
		nationality: "",
		height: "",
		shoeSize: "",
		hairColor: "",
		eyeColor: "",
		comments: "",
		password: "",
	});

	const fetchJobs = async () => {
		try {
			const data = await getAllJobs();
			setJobs(data);
		} catch (error) {
			console.error("Error fetching jobs:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	const handleModelInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setModelData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCreateModel = async () => {
		try {
			await createModel(modelData);
			alert("Model created successfully!");
			setIsModelModalOpen(false);
			setModelData({
				firstName: "",
				lastName: "",
				email: "",
				phoneNo: "",
				addressLine1: "",
				addressLine2: "",
				zip: "",
				city: "",
				country: "",
				birthDate: "",
				nationality: "",
				height: "",
				shoeSize: "",
				hairColor: "",
				eyeColor: "",
				comments: "",
				password: "",
			});
			fetchJobs();
		} catch (error) {
			console.error("Error creating model:", error);
			alert("Failed to create model. Please try again.");
		}
	};

	const handleModelAdded = async () => {
		fetchJobs();
	};

	const handleModelRemoved = async () => {
		fetchJobs();
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
			return (
				<div className="bg-white py-2 text-gray-500 flex flex-col justify-center h-full">
					No models assigned
				</div>
			);
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
			<div
				key={job.jobId}
				className="flex items-center justify-center h-full min-h-[64px]"
			>
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
				<Button onClick={() => setIsModelModalOpen(true)}>
					<FontAwesomeIcon icon={faUserPlus} className="w-6 h-4 mr-2" />
					Ny model
				</Button>
				<Modal
					isOpen={isModelModalOpen}
					onClose={() => setIsModelModalOpen(false)}
					title="Ny Model"
				>
					<div className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							value={modelData.firstName}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							value={modelData.lastName}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={modelData.email}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="phoneNo"
							placeholder="Phone Number"
							value={modelData.phoneNo}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="addressLine1"
							placeholder="Address Line 1"
							value={modelData.addressLine1}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="addressLine2"
							placeholder="Address Line 2"
							value={modelData.addressLine2}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="zip"
							placeholder="ZIP Code"
							value={modelData.zip}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="city"
							placeholder="City"
							value={modelData.city}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="country"
							placeholder="Country"
							value={modelData.country}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="date"
							name="birthDate"
							placeholder="Birth Date"
							value={modelData.birthDate}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="nationality"
							placeholder="Nationality"
							value={modelData.nationality}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="height"
							placeholder="Height"
							value={modelData.height}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="shoeSize"
							placeholder="Shoe Size"
							value={modelData.shoeSize}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="hairColor"
							placeholder="Hair Color"
							value={modelData.hairColor}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="text"
							name="eyeColor"
							placeholder="Eye Color"
							value={modelData.eyeColor}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<textarea
							name="comments"
							placeholder="Comments"
							value={modelData.comments}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={modelData.password}
							onChange={handleModelInputChange}
							className="border p-2 w-full"
						/>
						<Button onClick={handleCreateModel}>Create Model</Button>
					</div>
				</Modal>
				<Button onClick={() => setIsManagerModalOpen(true)}>
					<FontAwesomeIcon icon={faUserTie} className="w-8/ h-4 mr-2" />
					Ny manager
				</Button>
				<ManagerModal
					isOpen={isManagerModalOpen}
					onClose={() => setIsManagerModalOpen(false)}
					onManagerAdded={() => {
						console.log("Manager added successfully");
					}}
				/>
				<Button onClick={() => setIsAddJobModalOpen(true)}>
					<FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 mr-2" />
					Opret nyt job
				</Button>
			</div>
			<AddJobModal
				isOpen={isAddJobModalOpen}
				onClose={() => setIsAddJobModalOpen(false)}
				onJobAdded={fetchJobs}
				onDataChange={() => {}}
			/>
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
