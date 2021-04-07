import { Instructor, Student } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import { Page } from "../../components/general/styledcomponents";
import { SPAContentContainer } from "../../components/general/spa";
import withSession from "../../util/session";
import Nav from "../../components/dashboard/nav";
import Hero from "../../components/dashboard/hero";
import axios from "axios";
import ContentBlock from "../../components/dashboard/contentblock";
import Footer from "../../components/general/footer";

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
			<Nav user={user} isStudent={isStudent} />
			<SPAContentContainer>
				<Hero user={user} isStudent={isStudent} />
				<ContentBlock user={user} isStudent={isStudent} />
			</SPAContentContainer>
			<Footer isStudent={isStudent} />
		</Page>
	);
};

export default Dashboard;

export const getServerSideProps = withSession(async ({ req }) => {
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
