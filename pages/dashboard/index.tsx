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

interface DashboardProps {
	user: Student | Instructor;
}

const Dashboard: React.FunctionComponent<DashboardProps> = ({ user }) => {
	const router = useRouter();
	return (
		<Page>
			<Head>
				<title>Dashboard</title>
			</Head>
			<SPAContentContainer>
				<Nav />
			</SPAContentContainer>
		</Page>
	);
};

export default Dashboard;

export const getServerSideProps = withSession(async ({ req, res }) => {
	const user = req.session.get("user");

	if (user === undefined) {
		// redirect to log in
		res.setHeader("location", "/");
		res.statusCode = 302;
		res.end();
		return {
			props: {},
		};
	}

	return {
		props: {
			user: req.session.get("user"),
		},
	};
});
