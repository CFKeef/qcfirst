import React from "react";
import styled from "styled-components";

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
} from "../general/styledcomponents";
import ClassCard, { CourseResponse } from "./classcard";
import Spinner from "../general/spinner";

export const DataContainer = styled.ul`
	padding: 0;
	list-style-type: none;
	width: 50%;
	border: 1px solid var(--accent2);
	border-radius: var(--border-radius);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
	flex-direction: column;
	@media (max-width: 30em) {
		width: 100%;
	}
`;

export const LightTextHeader = styled.span`
	opacity: 0.8;
	color: var(--text);
	margin: 2rem 0;
`;

const ContentBlock: React.FunctionComponent<SessionUserProps> = ({
	user,
	isStudent,
}) => {
	const { data, isLoading } = useQuery("course", async () => {
		if (isStudent) {
			return await fetchStudentCourses(user.id);
		} else return await fetchInstructorCourses(user.id);
	});

	if (isLoading) {
		return (
			<ColumnContainer>
				<Header>
					{isStudent ? "Courses Enrolled In" : "Courses Teaching"}
				</Header>
				<DataContainer>
					<Spinner />
				</DataContainer>
			</ColumnContainer>
		);
	}

	const dataContent = () => {
		return (
			<ColumnContainer style={{ marginTop: "2REM" }}>
				<Header>
					{isStudent ? "Courses Enrolled In" : "Courses Teaching"}
				</Header>
				<DataContainer style={{ marginTop: "2REM" }}>
					{data?.courses.length === 0 && (
						<LightTextHeader>
							Looks like your not{" "}
							{isStudent ? "enrolled in" : "teaching"} anything
						</LightTextHeader>
					)}
					{data?.courses.length > 0 &&
						data.courses.map((element: CourseResponse) => {
							return (
								<ClassCard course={element} key={element.id} />
							);
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
};

export default ContentBlock;
