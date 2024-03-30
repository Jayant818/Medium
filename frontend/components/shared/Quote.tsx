import React from "react";

const Quote = () => {
	return (
		<div className="w-full h-screen hidden lg:flex justify-center  lg:flex-col px-12 items-center bg-slate-200">
			<h3 className="text-3xl font-bold  ">
				The Customer Service I received was exceptional. The support team went
				above and beyond to address my concern.
			</h3>
			<div className="w-full mt-4 text-left">
				<p className="font-semibold text-base">Jayant</p>
				<p className="font-light text-sm">CEO - DigiVote</p>
			</div>
		</div>
	);
};

export default Quote;
