"use client";
import useFullBlog from "@/Hooks/useFullBlog";
import Avatar from "@/components/shared/Avatar";
import { useParams } from "next/navigation";
import React from "react";

const Page = ({}) => {
	const params = useParams<{ id: string }>();
	console.log(params);
	const { loading, fullBlog } = useFullBlog(Number(params.id));
	console.log(fullBlog);
	if (loading)
		return (
			<div className="w-full flex justify-center mt-10 animate-pulse">
				<div className="grid grid-cols-12 w-[80%]">
					<div className="col-span-8  space-y-4">
						<div className="h-6 bg-gray-200 rounded w-2/3"></div>
						<div className="h-4 bg-gray-200 rounded w-1/4"></div>
						<div className="h-20 bg-gray-200 rounded w-full"></div>
					</div>
					<div className="col-span-4 ">
						<div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
						<div className="flex items-center gap-2">
							<div>
								<div className="h-12 w-12 bg-gray-200 rounded-full"></div>
							</div>
							<div>
								<div className="h-4 bg-gray-200 rounded w-1/2"></div>
								<div className="h-10 bg-gray-200 rounded w-3/4"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);

	return (
		<div className="w-full flex justify-center mt-10">
			<div className="grid grid-cols-12 w-[80%]">
				<div className="col-span-8  space-y-4">
					{/* @ts-ignore */}
					<h1 className="text-3xl font-bold">{fullBlog.blog.title}</h1>
					<p className="text-gray-400 ">Posted on March 30,2023</p>
					{/* @ts-ignore */}
					<p className=" ">{fullBlog.blog.content}</p>
				</div>
				<div className="col-span-4 ">
					<p className="text-lg font-medium mb-2">Author</p>
					<div className="flex items-center gap-2">
						<div>
							<Avatar
								// @ts-ignore
								Name={fullBlog.blog.author?.name || "Anonymous"}
								size="Big"
							/>
						</div>
						<div>
							<h1 className="text-lg font-semibold">
								{/* @ts-ignore */}
								{fullBlog.blog.author?.name || "Anonymous"}
							</h1>
							<p>A Very good catch user description</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
