"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_ALL_BLOGS } from "@/constants";

const useBlog = () => {
	const [loading, setLoading] = useState(true);
	interface BlogProps {
		id: number;
		title: string;
		content: string;
		author: {
			name: string;
		};
	}
	const [blogs, setBlogs] = useState<BlogProps[]>([]);

	useEffect(() => {
		console.log(GET_ALL_BLOGS);
		// console.log(
		// 	GET_ALL_BLOGS ===
		// 		"https://backend.yadavjayant2003.workers.dev/api/v1/blog/bulk"
		// );
		// console.log("https://backend.yadavjayant2003.workers.dev/api/v1/blog/bulk");
		axios
			.get(GET_ALL_BLOGS, {
				headers: {
					Authorization: localStorage.getItem("jwt"),
				},
			})
			.then((res) => {
				const data = res.data;
				setBlogs(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching blogs:", error);
				setLoading(false);
			});
	}, []);

	return { blogs, loading };
};

export default useBlog;
