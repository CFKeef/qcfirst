// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Will fix this later having an issue with inheritance
import { Course } from "@prisma/client";
import React, { useState } from "react";
import styled from "styled-components";
import { ParagraphText, SlimButton } from "../general/styledcomponents";
import { semesters, departments, statuses } from "../create/data/data";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../general/spinner";

export interface CourseResponse extends Course {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	enrolled: any;
}

interface ClassCardProps {
	course: CourseResponse | Course;
	view?: string;
	action?: (course: CourseResponse | Course) => void;
	userID?: number;
}
export const CardListItem = styled.li`
	border: 2px solid var(--accent3);
	margin: 1rem;
	height: 8rem;
	border-radius: var(--border-radius);
	width: calc(100% - 40px);
`;
export const PosRow = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: row;
	width: 100%;
	height: 100%;
	padding: 1rem;

	@media (max-width: 30em) {
		padding: 0.5rem;
	}
`;
export const InfoColumn = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	width: 40%;
	height: 100%;
`;

export const ButtonColumn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	height: 100%;
	width: 15%;
`;

export const LightText = styled(ParagraphText)`
	opacity: 0.8;
	font-size: 0.8rem;
`;
export const DetailText = styled(ParagraphText)`
	font-size: 0.9rem;
	width: 90%;
`;
export const DeptText = styled(DetailText)`
	font-weight: bold;
`;
export const BottomText = styled(DetailText)`
	margin-top: auto;
`;
export const Spacer = styled.br`
	margin-top: 0.8rem;
`;

const Tab = styled.div`
	height: 1.5rem;
	width: 52%;
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: var(--border-radius);
	color: var(--bg);
`;
export const OpenTab = styled(Tab)`
	background-color: var(--success);
`;

export const WaitListTab = styled(Tab)`
	background-color: var(--warning);
`;

export const ClosedTab = styled(Tab)`
	background-color: var(--error);
`;

const FieldGroup = styled.div`
	margin-top: auto;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
`;
const ClassCard: React.FunctionComponent<ClassCardProps> = ({
	course,
	view,
	action,
	userID,
}) => {
	const [loading, setLoading] = useState(false);
	const generateInstructorDashBoardCard = () => {
		return (
			<React.Fragment>
				<InfoColumn>
					<LightText>
						{
							semesters.find(
								(element) => element.value === course.semester
							)?.label
						}
					</LightText>
					<DeptText>
						{
							departments.find(
								(element) => element.value === course.department
							)?.label
						}{" "}
						{course.id}
					</DeptText>
					<DetailText>{course.name}</DetailText>
					<BottomText>
						Status:{" "}
						{
							statuses.find(
								(element) => element.value === course.status
							)?.label
						}
					</BottomText>
				</InfoColumn>
				<InfoColumn>
					<LightText>Scheduled</LightText>
					<DetailText>
						{course.startTime}-{course.endTime}
					</DetailText>
					<DetailText>{course.daysScheduled}</DetailText>
				</InfoColumn>
				<ButtonColumn>
					<SlimButton onClick={() => action(course)}>
						{view ? "Enroll" : "View"}
					</SlimButton>
				</ButtonColumn>
			</React.Fragment>
		);
	};

	const generateSearchResultsCard = () => {
		const generateStatusCard = () => {
			const status = statuses.find(
				(element) => element.value === course.status
			);
			switch (status?.value) {
				case 1:
					return <WaitListTab>Status: {status?.label}</WaitListTab>;
				case 2:
					return <ClosedTab>Status: {status?.label}</ClosedTab>;
				default:
					return <OpenTab>Status: {status?.label}</OpenTab>;
			}
		};

		const handleEnrollment = async () => {
			setLoading(true);
			await axios
				.post("/api/enroll", { courseID: course.id, userID: userID })
				.then((res) => {
					setLoading(false);
					if (res.status === 200) useRouter().push("/dashboard");
				})
				.catch((err) => console.log(err));
		};

		return (
			<React.Fragment>
				<InfoColumn>
					<LightText>
						{
							semesters.find(
								(element) => element.value === course.semester
							)?.label
						}
					</LightText>
					<DeptText>
						{
							departments.find(
								(element) => element.value === course.department
							)?.label
						}{" "}
						{course.id}
					</DeptText>
					<BottomText>{generateStatusCard()}</BottomText>
				</InfoColumn>
				<InfoColumn>
					<LightText>Scheduled</LightText>
					<DetailText>
						{course.startTime}-{course.endTime}
					</DetailText>
					<DetailText>{course.daysScheduled}</DetailText>
					<FieldGroup>
						<LightText>Professor</LightText>
						<DetailText>
							{course.instructor.firstName +
								" " +
								course.instructor.lastName}
						</DetailText>
					</FieldGroup>
				</InfoColumn>
				<ButtonColumn onClick={() => handleEnrollment()}>
					<SlimButton>{loading ? <Spinner /> : "Enroll"}</SlimButton>
				</ButtonColumn>
			</React.Fragment>
		);
	};
	const determineContent = () => {
		if (view === "enroll") {
			return generateSearchResultsCard();
		} else return generateInstructorDashBoardCard();
	};
	return (
		<CardListItem>
			<PosRow>{determineContent()}</PosRow>
		</CardListItem>
	);
};

export default ClassCard;
