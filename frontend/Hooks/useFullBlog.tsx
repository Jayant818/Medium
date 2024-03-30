"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_A_BLOG } from "@/constants";

const useFullBlog = (id: number) => {
	const [loading, setLoading] = useState(true);
	const [fullBlog, setFullBlog] = useState([]);

	useEffect(() => {
		const url = `${GET_A_BLOG}/${id}`;
		axios
			.get(url, {
				headers: {
					Authorization: localStorage.getItem("jwt"),
				},
			})
			.then((res) => {
				const data = res.data;
				setFullBlog(data);
				setLoading(false);
			})
			.catch((e) => {
				alert(e);
			});
	}, [id]);

	return { loading, fullBlog };
};

export default useFullBlog;
