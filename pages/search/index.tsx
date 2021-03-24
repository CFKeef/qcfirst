import { Instructor, Student } from "@prisma/client";
import Head from "next/head";

import React from "react";
import Hero from "../../components/dashboard/hero";
import Nav from "../../components/dashboard/nav";
import { SPAContentContainer } from "../../components/general/spa";
import { Page } from "../../components/general/styledcomponents";
import withSession from "../../util/session";
import { SessionUserProps } from "../dashboard";

const Search: React.FunctionComponent<SessionUserProps> = ({
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
			</SPAContentContainer>
		</Page>
	);
};

export default Search;

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
