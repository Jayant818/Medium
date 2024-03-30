import Auth from "@/components/shared/Auth";
import Quote from "@/components/shared/Quote";
import React from "react";

const SignUp = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2">
			<Auth type="signup" />
			<Quote />
		</div>
	);
};

export default SignUp;
