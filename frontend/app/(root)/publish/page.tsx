"use client";
import InputField from "@/components/shared/InputField";
import React, { useState } from "react";
import axios from "axios";
import { POST_A_BLOG } from "@/constants";
import { useRouter } from "next/navigation";

const Page = () => {
	const [data, setData] = useState({
		title: "",
		content: "",
	});

	const router = useRouter();

	const createBlog = async () => {
		const response = await axios.post(POST_A_BLOG, data, {
			headers: {
				Authorization: localStorage.getItem("jwt"),
			},
		});

		// if (response.status === 201) {
		router.push(`/blogs/${response.data.id}`);
		// }
		console.log(response);
	};

	return (
		<div className="flex justify-center w-full">
			<div className="w-[70%]">
				<h3 className="text-2xl text-black w-[60%]">Post a Blog</h3>
				<InputField
					label="Title"
					placeholder="Enter title"
					type="text"
					onChange={(e) => {
						setData({
							...data,
							title: e.target.value,
						});
					}}
				/>

				<label
					htmlFor="message"
					className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Your message
				</label>
				<textarea
					id="message"
					rows={8}
					className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Write your thoughts here..."
					onChange={(e) => {
						setData({
							...data,
							content: e.target.value,
						});
					}}
				></textarea>
				<div className="flex justify-end">
					<button
						onClick={createBlog}
						className="bg-blue-500 text-white py-2 px-4 font-semibold rounded-md mt-2"
					>
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default Page;
