import React from "react";
import Head from "next/head";
import Form from "../../components/recover/form";
import {
	CenteredContentPage,
	BorderedContainer,
	Header,
	SubHeader,
} from "../../components/general/styledcomponents";
import ThemeToggle from "../../components/general/themetoggle";
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
const Recover: React.FunctionComponent = () => {
	return (
		<CenteredContentPage>
			<Head>
				<title>Recover Account</title>
			</Head>
			<BorderedContainer style={{ padding: "2REM" }}>
				<Header>Coursor</Header>
				<SubHeader>Recover your account</SubHeader>
				<Form />
				<ThemeToggle />
			</BorderedContainer>
		</CenteredContentPage>
	);
};

export default Recover;
