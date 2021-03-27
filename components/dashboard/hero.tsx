import { Instructor, Student } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { SessionUserProps } from "../../pages/dashboard";
import { ParagraphText } from "../general/styledcomponents";

const Page = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

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

const GreetingText = styled.h2`
	color: var(--fg);
	margin: 2rem 0 0 0;
`;

const NameText = styled.h1`
	color: var(--fg);
	font-weight: bold;
	margin: 0.25rem 0;
`;

const IDText = styled(ParagraphText)`
	opacity: 0.7;
	margin: 0 0 2rem 0;
`;

const Hero: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	const generateID = () => {
		if (isStudent) {
			return <IDText>#{user.id}</IDText>;
		}
	};
	return (
		<Page>
			<Container>
				<GreetingText>Hello,</GreetingText>
				{console.log(user)}
				<NameText>{user.firstName + " " + user.lastName}</NameText>
				{generateID()}
			</Container>
		</Page>
	);
};

export default Hero;