import React from "react";

const BlogSkeleton = () => {
	return (
		<div className="flex w-full flex-col justify-center items-center mt-4 animate-pulse">
			<div className="w-1/3 space-y-4 border-b-[1px] border-gray-300 pb-2">
				<div className="flex items-center gap-2">
					<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
					<div className="h-4 w-16 bg-gray-200 rounded"></div>
					<div className="h-4 w-16 bg-gray-200 rounded"></div>
				</div>
				<div>
					<div className="h-5 w-48 bg-gray-200 rounded mt-2"></div>
					<div className="h-4 w-32 bg-gray-200 rounded mt-2"></div>
				</div>
				<div>
					<div className="h-3 w-16 bg-gray-200 rounded mt-2"></div>
				</div>
			</div>
		</div>
	);
};

export default BlogSkeleton;
