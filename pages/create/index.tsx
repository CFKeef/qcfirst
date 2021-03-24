import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Nav from "../../components/dashboard/nav";
import { SPAContentContainer } from "../../components/general/spa";
import { Page } from "../../components/general/styledcomponents";
import withSession from "../../util/session";
import { SessionUserProps } from "../dashboard";

const Container = styled.section`
	margin: 0 20px;
	width: calc(100%-40px);
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	max-width: 1100px;
	width: 100%;
`;
const PositionContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

const PageTitleText = styled.h1`
	color: var(--fg);
	text-align: center;
	width: 100%;
	margin: 3rem 0;
`;

const Create: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	return (
		<Page>
			<Head>
				<title>Course Creation</title>
			</Head>
			<SPAContentContainer>
				<Nav user={user} isStudent={isStudent} />
				<PositionContainer>
					<Container>
						<PageTitleText>Create your course</PageTitleText>
					</Container>
				</PositionContainer>
			</SPAContentContainer>
		</Page>
	);
};

export default Create;

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
