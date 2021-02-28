import React from "react";
import styled from "styled-components";
import Form from "../../components/general/signup/form";
import {
	CenteredContentPage,
	BorderedContainer,
	Header,
	SubHeader,
} from "../../components/general/styledcomponents";
import ThemeToggle from "../../components/general/themetoggle";

const Login: React.FunctionComponent = () => {
	return (
		<CenteredContentPage>
			<BorderedContainer style={{ padding: "2REM" }}>
				<Header>Coursor</Header>
				<SubHeader>Create your account</SubHeader>
				<Form />
				<ThemeToggle />
			</BorderedContainer>
		</CenteredContentPage>
	);
};

export default Login;
