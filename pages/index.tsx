import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Form from "../components/login/form";
import {
	CenteredContentPage,
	BorderedContainer,
	Header,
	SubHeader,
} from "../components/general/styledcomponents";
import ThemeToggle from "../components/general/themetoggle";

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
