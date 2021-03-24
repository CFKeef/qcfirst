import { Instructor, Student } from "@prisma/client";
import React from "react";
import styled from "styled-components";
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

interface HeroProps {
	user: Student | Instructor;
}

const Hero: React.FunctionComponent<HeroProps> = ({ user }) => {
	return (
		<Page>
			<Container>
				<GreetingText>Hello,</GreetingText>
				<NameText>{user.firstName + " " + user.lastName}</NameText>
				<IDText>#{user.id}</IDText>
			</Container>
		</Page>
	);
};

export default Hero;
