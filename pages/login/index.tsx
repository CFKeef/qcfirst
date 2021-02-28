import React from "react";
import styled from "styled-components";
import Form from "../../components/general/login/form";
import {
	CenteredContentPage,
	BorderedContainer,
	Header,
	SubHeader,
} from "../../components/general/styledcomponents";

const Login: React.FunctionComponent = () => {
	return (
		<CenteredContentPage>
			<BorderedContainer style={{ padding: "2REM" }}>
				<Header>Coursor</Header>
				<SubHeader>Welcome Back!</SubHeader>
				<Form />
			</BorderedContainer>
		</CenteredContentPage>
	);
};

export default Login;
