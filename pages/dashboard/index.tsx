import { Instructor, Student } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery, QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Head from "next/head";
import { Page } from "../../components/general/styledcomponents";
import { SPAContentContainer } from "../../components/general/spa";
import withSession from "../../util/session";
import Nav from "../../components/dashboard/nav";
import Hero from "../../components/dashboard/hero";

export interface SessionUserProps {
	user: Student | Instructor;
	isStudent: boolean;
}

const Dashboard: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	const router = useRouter();
	return (
		<Page>
			<Head>
				<title>Dashboard</title>
			</Head>
			<SPAContentContainer>
				<Nav user={user} isStudent={isStudent} />
				<Hero user={user} isStudent={isStudent} />
			</SPAContentContainer>
		</Page>
	);
};

export default Dashboard;

export const getServerSideProps = withSession(async ({ req, res }) => {
	const user = req.session.get("user");

	if (!user) {
		// redirect to log in
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	} else {
		return {
			props: {
				user: user,
				isStudent: user.isStudent,
			},
		};
	}
});
