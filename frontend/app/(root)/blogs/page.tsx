"use client";
import useBlog from "@/Hooks/useBlog";
import BlogSkeleton from "@/components/Blogs/BlogSkeleton";
import BlogCard from "@/components/shared/BlogCard";
import React from "react";

const Blogs = () => {
	// hame blogs fetch karne padege either we can use the state management tools like recoil & redux or we can use context
	// wo sab use karna sense nhi banata , cuz hame wo data khi orr access nhi karna
	// we use useState and we can use custom hooks to do so.

	const { blogs, loading } = useBlog();

	if (loading) {
		return (
			<div>
				<BlogSkeleton />
				<BlogSkeleton />
				<BlogSkeleton />
				<BlogSkeleton />
				<BlogSkeleton />
			</div>
		);
	}
	// "id": 1,
	// "title": "How are you",
	// "content": "fine",
	// "published": false,
	// "authorId": 7
	return (
		<div>
			{blogs.map((blog) => (
				<BlogCard
					title={blog.title}
					content={blog.content}
					key={blog.id}
					id={blog.id}
					name={blog.author.name || "Anonymous"}
				/>
			))}
		</div>
	);
};

export default Blogs;
