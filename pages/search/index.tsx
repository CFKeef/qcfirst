import { Course, Instructor, Student } from "@prisma/client";
import Head from "next/head";

import React, { useState } from "react";
import ClassCard from "../../components/dashboard/classcard";
import Nav from "../../components/dashboard/nav";
import { SPAContentContainer } from "../../components/general/spa";
import {
	Button,
	Page,
	ParagraphText,
} from "../../components/general/styledcomponents";
import Form from "../../components/search/form";
import withSession from "../../util/session";
import {
	PageTitleText,
	PositionContainer,
	ResponsiveContainer,
} from "../create";
import { SessionUserProps } from "../dashboard";

const Search: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	const [view, setView] = useState(false);
	const [results, setResults] = useState<Course[] | null>([]);

	const generateCards = () => {
		return (
			<ul>
				{results?.map((result) => {
					return (
						<li key={result.id}>
							<ParagraphText>{result.name}</ParagraphText>
						</li>
					);
				})}
			</ul>
		);
	};

	const determineContent = () => {
		if (view) {
			return (
				<ResponsiveContainer>
					<PageTitleText>Search for a course</PageTitleText>
					{generateCards()}
				</ResponsiveContainer>
			);
		} else {
			return (
				<ResponsiveContainer>
					<PageTitleText>Search for a course</PageTitleText>
					<Form userID={user.id} setResults={setResults} />
					<Button onClick={() => setView(true)}>
						{results
							? results.length > 0
								? `View ${results.length} now`
								: "Didn't find anything"
							: null}
					</Button>
				</ResponsiveContainer>
			);
		}
	};

	return (
		<Page>
			<Head>
				<title>Dashboard</title>
			</Head>
			<SPAContentContainer>
				<Nav user={user} isStudent={isStudent} />
				<PositionContainer>{determineContent()}</PositionContainer>
			</SPAContentContainer>
		</Page>
	);
};

export default Search;

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
