import React from "react";
import Form from "../../components/signup/form";
import {
	CenteredContentPage,
	BorderedContainer,
	Header,
	SubHeader,
} from "../../components/general/styledcomponents";
import ThemeToggle from "../../components/general/themetoggle";
import Head from "next/Head";

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
