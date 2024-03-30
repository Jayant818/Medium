import React from "react";

const Avatar = ({ Name, size }: { Name: string; size: "Big" | "small" }) => {
	return (
		<div
			className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
				size === "Big" ? "h-10 w-10" : "h-6 w-6"
			}`}
		>
			<span
				className={`font-medium text-gray-600 dark:text-gray-300 ${
					size === "Big" ? "text-xl" : "text-lg"
				}`}
			>
				{Name[0]}
			</span>
		</div>
	);
};

export default Avatar;
