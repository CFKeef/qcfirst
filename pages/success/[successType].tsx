import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
	Header,
	ParagraphText,
	SubHeader,
	CenteredContentPage,
} from "../../components/general/styledcomponents";
import { AiFillCheckCircle } from "react-icons/ai";
import Head from "next/head";

const CheckMark = styled(AiFillCheckCircle)`
	height: 10rem;
	width: auto;
	margin-bottom: 2rem;
`;

const Success: React.FunctionComponent = () => {
	const router = useRouter();
	const { successType } = router.query;

	const redirectText =
		successType !== "authenticated"
			? "Redirecting you to log in page!"
			: "Redirecting you to dashboard!";

	const generateSubHeader = () => {
		switch (successType) {
			case "authenticated":
				return "Account activated!";
			default:
				return "Check your email for the next step!";
		}
	};

	useEffect(() => {
		const redirect = setInterval(() => {
			router.replace("/");
		}, 3000);

		return () => clearInterval(redirect);
	}, []);

	return (
		<CenteredContentPage>
			<Head>
				<title>Success!</title>
			</Head>
			<Header>Success!</Header>
			<SubHeader>{generateSubHeader()}</SubHeader>
			<CheckMark />
			<ParagraphText>{redirectText}</ParagraphText>
		</CenteredContentPage>
	);
};

export default Success;
