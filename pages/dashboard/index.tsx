import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { withAuthSync } from "../../util/auth";

const Dashboard: React.FunctionComponent = () => {
	const router = useRouter();
	const { isLoading, data, error } = useQuery("profile", () =>
		axios.post("/api/user").then((res) => {
			if (res.status >= 300) throw new Error("API CLIENT ERROR");
			else return res.data;
		})
	);

	useEffect(() => {
		if (error) router.push("/");
	}, [error, router]);

	return <span>sdsadad{console.log(data)}</span>;
};

export default withAuthSync(Dashboard);
