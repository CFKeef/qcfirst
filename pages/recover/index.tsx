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
