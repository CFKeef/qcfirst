import { Course, Instructor, Student } from "@prisma/client";
import Head from "next/head";

import React, { useEffect, useState } from "react";
import { FieldSpan } from "../../components/create/form";
import ClassCard from "../../components/dashboard/classcard";
import { DataContainer } from "../../components/dashboard/contentblock";
import Nav from "../../components/dashboard/nav";
import Note from "../../components/general/note";
import { SPAContentContainer } from "../../components/general/spa";
import {
	BorderedContainer,
	Button,
	Container,
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
	const [results, setResults] = useState<Course[] | null>([]);
	const [searched, setSearched] = useState(false);
	const [redirect, setRedirect] = useState(false);

	const determineContent = () => {
		const determineUserFeedback = () => {
			if (searched) {
				if (results) {
					if (results.length > 0) {
						setRedirect(true);
					} else {
						return (
							<Note
								type="Warning"
								message="Did not find anything that matched the criteria"
							/>
						);
					}
				} else {
					return <Note type="Error" message="Oh no it blew up :(" />;
				}
			}
		};
		const handleBackButton = () => {
			setRedirect(false);
			setSearched(false);
		};

		if (redirect) {
			return (
				<ResponsiveContainer>
					<PageTitleText>{`Showing ${results?.length} results`}</PageTitleText>
					<DataContainer>
						{results?.map((course) => {
							return (
								<ClassCard
									key={course.id}
									course={course}
									view={"enroll"}
									action={() => console.log("enrolled")}
									userID={user.id}
								/>
							);
						})}
					</DataContainer>
					<FieldSpan />
					<Container>
						<Button onClick={() => handleBackButton()}>
							Back to Search
						</Button>
					</Container>
				</ResponsiveContainer>
			);
		}
		return (
			<ResponsiveContainer>
				<PageTitleText>Search for a course</PageTitleText>
				<Form
					userID={user.id}
					setResults={setResults}
					setSearched={setSearched}
				/>
				<Container>{determineUserFeedback()}</Container>
			</ResponsiveContainer>
		);
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

export const getServerSideProps = withSession(async ({ req }) => {
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
