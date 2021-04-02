import React from "react";
import Head from "next/head";
import Form from "../components/login/form";
import {
	CenteredContentPage,
	BorderedContainer,
	Header,
	SubHeader,
} from "../components/general/styledcomponents";
import ThemeToggle from "../components/general/themetoggle";
import withSession from "../util/session";

export const getServerSideProps = withSession(async ({ req }) => {
	const user = req.session.get("user");

	if (user) {
		// redirect to log in
		return {
			redirect: {
				permanent: false,
				destination: "/dashboard",
			},
		};
	} else {
		return {
			props: {},
		};
	}
});

const Login: React.FunctionComponent = () => {
	return (
		<CenteredContentPage>
			<Head>
				<title>Welcome!</title>
			</Head>
			<BorderedContainer style={{ padding: "2REM" }}>
				<Header>Coursor</Header>
				<SubHeader>Welcome Back!</SubHeader>
				<Form />
				<ThemeToggle />
			</BorderedContainer>
		</CenteredContentPage>
	);
};

export default Login;
