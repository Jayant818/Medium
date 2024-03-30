import React from "react";
import Avatar from "./Avatar";
import Circle from "../Blogs/Circle";
import Link from "next/link";

interface BlogCardProps {
	id: number;
	title: string;
	content: string;
	name: string;
}
const BlogCard = ({ id, title, content, name }: BlogCardProps) => {
	return (
		<div className="flex w-full flex-col justify-center items-center mt-4">
			<div className="w-1/3 space-y-4  border-b-[1px] border-slate-300 pb-2">
				<Link href={`/blogs/${id}`}>
					<div className="flex items-center gap-2 ">
						<Avatar Name={name} size="small" />
						<p className="font-semibold">{name}</p>
						<Circle />
						<p className="font-extralight text-slate-400 text-sm">
							Mar 28 2024
						</p>
					</div>
					<div>
						<h1 className="text-xl font-bold ">{title}</h1>
						<p className="font-light text-slate-400">
							{content.slice(0, 100) + "..."}
						</p>
					</div>
					<div>
						<p className="font-extralight text-slate-400 text-sm">
							{Math.floor(content.length / 100)} min reads
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default BlogCard;
