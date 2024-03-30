"use client";

import Link from "next/link";
import React from "react";
import InputField from "./InputField";
// import { BACKEND_URL } from "@/constants";
import { useRouter } from "next/navigation";
import axios from "axios";

const Auth = ({ type }: { type: "signup" | "signIn" }) => {
	const router = useRouter();
	const [data, setdata] = React.useState({
		name: "",
		email: "",
		password: "",
	});

	const sendRequest = async () => {
		console.log(data);
		try {
			const url = `${process.env.BACKEND_URL}/api/v1/${
				type === "signup" ? "signup" : "signin"
			}`;
			console.log(url);
			const res = await axios.post(url, data);
			const ans = res.data;
			console.log("Token", ans);
			localStorage.setItem("jwt", ans.jwt);
			router.push("/");
		} catch (e) {
			alert(e);
		}

		// e.preventDefault();
	};

	return (
		<div className=" h-screen w-full flex flex-col items-center justify-center ">
			<h3 className="text-3xl font-semibold  mb-2">
				{type === "signup" ? "Create an account" : "LogIn to your account"}
			</h3>
			{type === "signup" ? (
				<p className="font-light text-sm">
					Already have an account?{" "}
					<Link className="underline" href="/signIn">
						LogIn
					</Link>
				</p>
			) : (
				<p className="font-light text-sm">
					Create an account?{" "}
					<Link className="underline" href="/signUp">
						SignUp
					</Link>
				</p>
			)}
			<div className="w-[60%]">
				{type === "signup" && (
					<InputField
						type="name"
						label="Name"
						placeholder="Enter your username"
						onChange={(e) => setdata({ ...data, name: e.target.value })}
					/>
				)}
				<InputField
					type="email"
					label="Email"
					placeholder="Enter your Email"
					onChange={(e) => setdata({ ...data, email: e.target.value })}
				/>
				<InputField
					type="password"
					label="Password"
					placeholder="xxxxxxxxxxx"
					onChange={(e) => setdata({ ...data, password: e.target.value })}
				/>
				<button
					type="button"
					className="text-white w-full  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
					onClick={sendRequest}
				>
					{type === "signIn" ? "LogIN" : "Create an account"}
				</button>
			</div>
		</div>
	);
};

export default Auth;
