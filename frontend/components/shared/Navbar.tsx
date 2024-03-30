import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="w-full flex justify-between items-center  px-10 py-4  bg-slate-700">
			<Link href="/">
				<h2 className="font-extrabold text-white tracking-wide text-2xl">
					Medium
				</h2>
			</Link>
			<div>
				<Link href="/publish">

				<button
					type="button"
					className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 "
				>
					Publish
				</button>
				</Link>
				<Avatar Name="Jayant" size="Big" />
			</div>
		</nav>
	);
};

export default Navbar;
