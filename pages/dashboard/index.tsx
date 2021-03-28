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
import axios from "axios";

export interface SessionUserProps {
	user: Student | Instructor;
	isStudent: boolean;
}

const fetchStudentCourses = async (id: number) => {
	const data = await axios.post("/api/user/student", { id: id });
	return data;
};

const fetchInstructorCourses = async (id: number) => {
	const data = await axios.post("/api/user/instructor", { id: id });
	return data.data;
};

const Dashboard: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	const router = useRouter();
	const { status, data, error, isFetching } = useQuery("data", () =>
		fetchInstructorCourses(user.id)
	);

	return (
		<Page>
			<Head>
				<title>Dashboard</title>
			</Head>
			<SPAContentContainer>
				<Nav user={user} isStudent={isStudent} />
				<Hero user={user} isStudent={isStudent} />
				<div>
					{data?.map((element) => {
						return <p>{element.name}</p>;
					})}
				</div>
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
		const queryClient = new QueryClient();
		if (user.isStudent) {
			await queryClient.prefetchQuery("courses", () =>
				fetchStudentCourses(user.id)
			);
		} else {
			await queryClient.prefetchQuery("course", () =>
				fetchInstructorCourses(user.id)
			);
		}
		return {
			props: {
				user: user,
				isStudent: user.isStudent,
				dehydrated: dehydrate(queryClient),
			},
		};
	}
});
