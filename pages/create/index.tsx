import Head from "next/head";
import React from "react";
import styled from "styled-components";
import Form from "../../components/create/form";
import Nav from "../../components/dashboard/nav";
import Footer from "../../components/general/footer";
import { SPAContentContainer } from "../../components/general/spa";
import { Page } from "../../components/general/styledcomponents";
import withSession from "../../util/session";
import { SessionUserProps } from "../dashboard";

export const ResponsiveContainer = styled.section`
	margin: 0 20px;
	width: calc(100% - 40px);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	max-width: 1100px;
	width: 100%;
`;
export const PositionContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

export const PageTitleText = styled.h2`
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
					<ResponsiveContainer>
						<PageTitleText>Create your course</PageTitleText>
						<Form userID={user.id} />
					</ResponsiveContainer>
				</PositionContainer>
			</SPAContentContainer>
			<Footer isStudent={isStudent} />
		</Page>
	);
};

export default Create;

export const getServerSideProps = withSession(async ({ req }) => {
	const user = req.session.get("user");

	if (!user || user.isStudent) {
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
