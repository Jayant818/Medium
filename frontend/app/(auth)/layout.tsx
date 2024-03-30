import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return <main className="bg-white">{children}</main>;
};

export default layout;
