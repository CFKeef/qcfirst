import { Instructor, Student } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import { Page } from "../../components/general/styledcomponents";
import { SPAContentContainer } from "../../components/general/spa";
import withSession from "../../util/session";
import Nav from "../../components/dashboard/nav";
import Hero from "../../components/dashboard/hero";
import { QueryCache, QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import axios, { AxiosError } from "axios";
import ContentBlock from "../../components/dashboard/contentblock";

export interface SessionUserProps {
	user: Student | Instructor;
	isStudent: boolean;
}

export const fetchStudentCourses = async (id: number) => {
	const { data } = await axios.post("/api/user/student", { id: id });
	return data;
};

export const fetchInstructorCourses = async (id: number) => {
	const { data } = await axios.post("/api/user/instructor", { id: id });
	return data;
};

const Dashboard: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	return (
		<Page>
			<Head>
				<title>Dashboard</title>
			</Head>
			<SPAContentContainer>
				<Nav user={user} isStudent={isStudent} />
				<Hero user={user} isStudent={isStudent} />
				<ContentBlock user={user} isStudent={isStudent} />
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
