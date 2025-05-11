import React, { useEffect, useState } from "react";
import Button from "../components/buttons/standard_button";
import Table from "../components/table/table";
import type { Job } from "../interfaces/job";
import type { Model } from "../interfaces/model";
import { getAllJobs, createModel } from "../services/api";
import Modal from "../components/modal/modal";

const ManagerPage: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
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
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setIsModalOpen(false);
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
        } catch (error) {
            console.error("Error creating model:", error);
            alert("Failed to create model. Please try again.");
        }
    };

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
                    <div className="space-y-4 max-h-[80vh] overflow-y-auto p-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={modelData.firstName}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={modelData.lastName}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={modelData.email}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="phoneNo"
                            placeholder="Phone Number"
                            value={modelData.phoneNo}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="addressLine1"
                            placeholder="Address Line 1"
                            value={modelData.addressLine1}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Address Line 2"
                            value={modelData.addressLine2}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP Code"
                            value={modelData.zip}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={modelData.city}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={modelData.country}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="date"
                            name="birthDate"
                            placeholder="Birth Date"
                            value={modelData.birthDate}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="nationality"
                            placeholder="Nationality"
                            value={modelData.nationality}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="height"
                            placeholder="Height"
                            value={modelData.height}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="shoeSize"
                            placeholder="Shoe Size"
                            value={modelData.shoeSize}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="hairColor"
                            placeholder="Hair Color"
                            value={modelData.hairColor}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <input
                            type="text"
                            name="eyeColor"
                            placeholder="Eye Color"
                            value={modelData.eyeColor}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <textarea
                            name="comments"
                            placeholder="Comments"
                            value={modelData.comments}
                            onChange={(e) =>
                                setModelData((prevData) => ({
                                    ...prevData,
                                    comments: e.target.value,
                                }))
                            }
                            className="border p-2 w-full"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={modelData.password}
                            onChange={handleInputChange}
                            className="border p-2 w-full"
                        />
                        <Button onClick={handleCreateModel}>Create Model</Button>
                    </div>
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
