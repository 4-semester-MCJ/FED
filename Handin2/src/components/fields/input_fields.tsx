import React from "react";

interface InputFieldProps {
	label: string;
	type: string;
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	type,
	value,
	placeholder,
	onChange,
	name,
}) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium mb-1">{label}</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				name={name}
				className="w-full px-3 py-2 border rounded"
			/>
		</div>
	);
};

export default InputField;
