import { Course, Instructor, Student } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import {
	fetchStudentCourses,
	fetchInstructorCourses,
	SessionUserProps,
} from "../../pages/dashboard";
import {
	ColumnContainer,
	ComponentContainer,
	ComponentPage,
	Header,
	ParagraphText,
} from "../general/styledcomponents";
import ClassCard, { CourseResponse } from "./classcard";

const DataContainer = styled.div`
	width: 50%;
	border: 1px solid var(--accent2);
	border-radius: var(--border-radius);

	@media (max-width: 30em) {
		width: 100%;
	}
`;

const ContentBlock: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	const { status, data, error, isFetching } = useQuery("course", async () => {
		if (isStudent) {
			return await fetchStudentCourses(user.id);
		} else return await fetchInstructorCourses(user.id);
	});
	const loadingContent = () => {
		return (
			<ColumnContainer style={{ marginTop: "1rem" }}>
				<Header>
					{isStudent ? "Courses Enrolled In" : "Courses Teaching"}
				</Header>
				<DataContainer>Loading</DataContainer>
			</ColumnContainer>
		);
	};

	if (isFetching) {
		return (
			<ComponentPage>
				<ComponentContainer>
					{isFetching && loadingContent()}
				</ComponentContainer>
			</ComponentPage>
		);
	}

	const dataContent = () => {
		return (
			<ColumnContainer>
				<Header style={{ margin: "1rem" }}>
					{isStudent ? "Courses Enrolled In" : "Courses Teaching"}
				</Header>
				<DataContainer>
					{data.map((element: CourseResponse) => {
						return <ClassCard course={element} key={element.id} />;
					})}
				</DataContainer>
			</ColumnContainer>
		);
	};
	return (
		<ComponentPage>
			<ComponentContainer>{data && dataContent()}</ComponentContainer>
		</ComponentPage>
	);
	// return (
	// 	<section>
	// 		{data.map((element: Course) => {
	// 			return (
	// 				<ParagraphText key={element.id}>
	// 					{element.name}
	// 				</ParagraphText>
	// 			);
	// 		})}
	// 	</section>
	// );
};

export default ContentBlock;
