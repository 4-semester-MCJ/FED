import React, { useState } from "react";
import Modal from "./modal";
import { createJob } from "../../services/api";
import InputField from "../fields/input_fields";
import Button from "../buttons/standard_button";

interface AddJobModalProps {
	isOpen: boolean;
	onClose: () => void;
	onJobAdded: () => void;
	onDataChange: (data: any) => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({
	isOpen,
	onClose,
	onJobAdded,
	onDataChange,
}) => {
	const [formData, setFormData] = useState({
		Customer: "",
		StartDate: "",
		Days: 1,
		Location: "",
		Comments: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const jobData = {
			newJob: {
				Customer: formData.Customer,
				StartDate: new Date(formData.StartDate).toISOString(),
				Days: parseInt(formData.Days.toString()),
				Location: formData.Location,
				Comments: formData.Comments,
			},
		};
		onDataChange(jobData);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		const newFormData = {
			...formData,
			[name]: type === "number" ? parseInt(value) || 0 : value,
		};
		setFormData(newFormData);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Opret nyt job">
			<form onSubmit={handleSubmit} className="space-y-4">
				<InputField
					label="Kunde"
					type="text"
					value={formData.Customer}
					placeholder="Indtast kunde"
					onChange={handleChange}
					name="Customer"
				/>

				<InputField
					label="Start dato"
					type="date"
					value={formData.StartDate}
					placeholder="VÃ¦lg dato"
					onChange={handleChange}
					name="StartDate"
				/>

				<InputField
					label="Antal dage"
					type="number"
					value={formData.Days.toString()}
					placeholder="Indtast antal dage"
					onChange={handleChange}
					name="Days"
				/>

				<InputField
					label="Lokation"
					type="text"
					value={formData.Location}
					placeholder="Indtast lokation"
					onChange={handleChange}
					name="Location"
				/>

				<InputField
					label="Kommentarer"
					type="text"
					value={formData.Comments}
					placeholder="Indtast kommentarer"
					onChange={handleChange}
					name="Comments"
				/>

				<div className="flex justify-end space-x-3">
					<Button
						type="button"
						onClick={onClose}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
					>
						Annuller
					</Button>
					<Button
						type="submit"
						apiCall={() => createJob(formData)}
						onSuccess={() => {
							onJobAdded();
							onClose();
						}}
						className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
					>
						Opret job
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default AddJobModal;