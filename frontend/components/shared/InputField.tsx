import React, { ChangeEvent } from "react";

interface InputFieldProps {
	type: string;
	label: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
	type,
	label,
	placeholder,
	onChange,
}: InputFieldProps) => {
	return (
		<div className="mb-6">
			<label
				htmlFor={type}
				className="block mb-2 text-sm font-medium text-gray-900 "
			>
				{label}
			</label>
			<input
				type={type}
				id="email"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
				placeholder={placeholder}
				onChange={onChange}
				required
			/>
		</div>
	);
};

export default InputField;
