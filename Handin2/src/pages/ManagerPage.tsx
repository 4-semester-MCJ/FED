import React, { useEffect, useState } from "react";
import Button from "../components/buttons/standard_button";
import Table from "../components/table/table";
import type { Job } from "../interfaces/job";
import type { Model } from "../interfaces/model";
import { getAllJobs, createModel, getAllModels } from "../services/api";
import Modal from "../components/modal/modal";
import { AddModelButton } from "../components/buttons/AddModelButton";
import { RemoveModelButton } from "../components/buttons/RemoveModelButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserPlus,
	faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import AddJobModal from "../components/modal/AddJobModal";

const ManagerPage: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
	const [isModelModalOpen, setIsModelModalOpen] = useState(false);
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [jobsData] = await Promise.all([getAllJobs(), getAllModels()]);
				setJobs(jobsData);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setModelData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCreateModel = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			console.log('Creating model with data:', modelData);
			await createModel({
				firstName: modelData.firstName,
				lastName: modelData.lastName,
				email: modelData.email,
				phoneNo: modelData.phoneNo,
				addressLine1: modelData.addressLine1,
				addressLine2: modelData.addressLine2,
				zip: modelData.zip,
				city: modelData.city,
				country: modelData.country,
				birthDate: modelData.birthDate,
				nationality: modelData.nationality,
				height: modelData.height,
				shoeSize: modelData.shoeSize,
				hairColor: modelData.hairColor,
				eyeColor: modelData.eyeColor,
				comments: modelData.comments,
				password: modelData.password
			});
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
			// Refresh jobs list to show any updates
			const updatedJobs = await getAllJobs();
			setJobs(updatedJobs);
		} catch (error) {
			console.error("Error creating model:", error);
			alert("Failed to create model. Please try again.");
		}
	};

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
			job.jobId,
			job.customer,
			job.location,
			formatDate(job.startDate),
			`${job.days} days`,
			formatModels(job.models || [], job.jobId),
			<div key={job.jobId} className="flex gap-2">
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
				<Button
					onClick={() => setIsModelModalOpen(true)}
					className="flex items-center gap-2"
				>
					<FontAwesomeIcon icon={faUserPlus} />
					Tilføj ny model
				</Button>
				<Button
					onClick={() => setIsAddJobModalOpen(true)}
					className="flex items-center gap-2"
				>
					<FontAwesomeIcon icon={faBriefcase} />
					Opret nyt job
				</Button>
			</div>

			{loading ? (
				<div className="text-center">Loading...</div>
			) : jobs.length === 0 ? (
				<div className="text-center text-gray-500">No jobs found</div>
			) : (
				<Table headers={headers} data={tableData} />
			)}

			<Modal
				isOpen={isModelModalOpen}
				onClose={() => setIsModelModalOpen(false)}
				title="Add New Model"
			>
				<form onSubmit={handleCreateModel} className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={modelData.firstName}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={modelData.lastName}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={modelData.email}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
								Phone Number
							</label>
							<input
								type="tel"
								id="phoneNo"
								name="phoneNo"
								value={modelData.phoneNo}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
								Address Line 1
							</label>
							<input
								type="text"
								id="addressLine1"
								name="addressLine1"
								value={modelData.addressLine1}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
								Address Line 2
							</label>
							<input
								type="text"
								id="addressLine2"
								name="addressLine2"
								value={modelData.addressLine2}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label htmlFor="zip" className="block text-sm font-medium text-gray-700">
								ZIP Code
							</label>
							<input
								type="text"
								id="zip"
								name="zip"
								value={modelData.zip}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="city" className="block text-sm font-medium text-gray-700">
								City
							</label>
							<input
								type="text"
								id="city"
								name="city"
								value={modelData.city}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="country" className="block text-sm font-medium text-gray-700">
								Country
							</label>
							<input
								type="text"
								id="country"
								name="country"
								value={modelData.country}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
								Birth Date
							</label>
							<input
								type="date"
								id="birthDate"
								name="birthDate"
								value={modelData.birthDate}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
								Nationality
							</label>
							<input
								type="text"
								id="nationality"
								name="nationality"
								value={modelData.nationality}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="height" className="block text-sm font-medium text-gray-700">
								Height (cm)
							</label>
							<input
								type="number"
								id="height"
								name="height"
								value={modelData.height}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="shoeSize" className="block text-sm font-medium text-gray-700">
								Shoe Size
							</label>
							<input
								type="number"
								id="shoeSize"
								name="shoeSize"
								value={modelData.shoeSize}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="hairColor" className="block text-sm font-medium text-gray-700">
								Hair Color
							</label>
							<input
								type="text"
								id="hairColor"
								name="hairColor"
								value={modelData.hairColor}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label htmlFor="eyeColor" className="block text-sm font-medium text-gray-700">
								Eye Color
							</label>
							<input
								type="text"
								id="eyeColor"
								name="eyeColor"
								value={modelData.eyeColor}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
						<div className="md:col-span-2">
							<label htmlFor="comments" className="block text-sm font-medium text-gray-700">
								Comments
							</label>
							<textarea
								id="comments"
								name="comments"
								value={modelData.comments}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								rows={3}
							/>
						</div>
						<div className="md:col-span-2">
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={modelData.password}
								onChange={handleInputChange}
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								required
							/>
						</div>
					</div>
					<div className="flex justify-end gap-4 mt-6">
						<Button type="button" onClick={() => setIsModelModalOpen(false)}>
							Cancel
						</Button>
						<Button type="submit">
							Create Model
						</Button>
					</div>
				</form>
			</Modal>

			<AddJobModal
				isOpen={isAddJobModalOpen}
				onClose={() => setIsAddJobModalOpen(false)}
			/>
		</div>
	);
};

export default ManagerPage;