"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		if (localStorage.getItem("jwt")) {
			console.log("User is logged in");
			router.push("/blogs");
		} else {
			console.log("User is not logged in");
			router.push("/Login");
		}
	}, [router]);
	return <div> </div>;
}
