import React, { useState } from "react";
import Modal from "./modal";
import { createManager } from "../../services/api";
import InputField from "../fields/input_fields";
import Button from "../buttons/standard_button";

interface ManagerModalProps {
	isOpen: boolean;
	onClose: () => void;
	onManagerAdded: () => void;
}

const ManagerModal: React.FC<ManagerModalProps> = ({
	isOpen,
	onClose,
	onManagerAdded,
}) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createManager(formData);
			onManagerAdded();
			onClose();
		} catch (error) {
			console.error("Error creating manager:", error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Ny Manager">
			<form onSubmit={handleSubmit} className="space-y-4">
				<InputField
					label="Fornavn"
					type="text"
					value={formData.firstName}
					placeholder="Indtast fornavn"
					onChange={handleChange}
					name="firstName"
				/>

				<InputField
					label="Efternavn"
					type="text"
					value={formData.lastName}
					placeholder="Indtast efternavn"
					onChange={handleChange}
					name="lastName"
				/>

				<InputField
					label="Email"
					type="email"
					value={formData.email}
					placeholder="Indtast email"
					onChange={handleChange}
					name="email"
				/>

				<InputField
					label="Adgangskode"
					type="password"
					value={formData.password}
					placeholder="Indtast adgangskode"
					onChange={handleChange}
					name="password"
				/>

					<Button
						type="submit"
						className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
					>
						Opret manager
					</Button>
			</form>
		</Modal>
	);
};

export default ManagerModal;
