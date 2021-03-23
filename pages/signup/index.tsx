import React from "react";
import Form from "../../components/signup/form";
import {
	CenteredContentPage,
	BorderedContainer,
	Header,
	SubHeader,
} from "../../components/general/styledcomponents";
import ThemeToggle from "../../components/general/themetoggle";
import Head from "next/head";
import withSession from "../../util/session";

export const getServerSideProps = withSession(async ({ req, res }) => {
	const user = req.session.get("user");

	if (user) {
		// redirect to log in
		res.setHeader("location", "dashboard");
		res.statusCode = 302;
		res.end();
		return {
			props: {
				user: req.session.get("user"),
			},
		};
	} else {
		return {
			props: {},
		};
	}
});

const Signup: React.FunctionComponent = () => {
	return (
		<CenteredContentPage>
			<Head>
				<title>Sign Up</title>
			</Head>
			<BorderedContainer style={{ padding: "2REM" }}>
				<Header>Coursor</Header>
				<SubHeader>Create your account</SubHeader>
				<Form />
				<ThemeToggle />
			</BorderedContainer>
		</CenteredContentPage>
	);
};

export default Signup;
