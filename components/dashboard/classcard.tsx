import { Course } from "@prisma/client";
import React from "react";
import styled from "styled-components";
import { ParagraphText, SlimButton } from "../general/styledcomponents";
import { days, semesters, departments } from "../create/data/data";

export interface CourseResponse extends Course {
	enrolled: Course[];
}
interface ClassCardProps {
	course: Course;
}
const CardListItem = styled.li`
	border: 1px solid var(--accent3);
	margin: 1rem;
	height: 8rem;
	border-radius: var(--border-radius);
`;
const PosRow = styled.div`
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
const InfoColumn = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	width: 40%;
	height: 100%;
`;

const ButtonColumn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	height: 100%;
	width: 15%;
`;

const LightText = styled(ParagraphText)`
	opacity: 0.8;
	font-size: 0.8rem;
`;
const DetailText = styled(ParagraphText)`
	font-size: 0.9rem;
	width: 90%;
`;
const DeptText = styled(DetailText)`
	font-weight: bold;
`;
const BottomText = styled(DetailText)`
	margin-top: auto;
`;
const Spacer = styled.br`
	margin-top: 0.8rem;
`;

const ClassCard: React.FunctionComponent<ClassCardProps> = ({ course }) => {
	const formatDaysString = () => {
		let str: string = "";
		// @ts-ignore
		course.daysScheduled.map((flag, index) => {
			if (flag) {
				str += days[index].key;
			}
		});

		return str;
	};

	return (
		<CardListItem>
			<PosRow>
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
						{course.enrolled.length} / {course.capacity} Enrolled
					</BottomText>
				</InfoColumn>
				<InfoColumn>
					<Spacer />
					<DetailText>
						{course.startTime}-{course.endTime}
					</DetailText>
					<DetailText>{formatDaysString()}</DetailText>
				</InfoColumn>
				<ButtonColumn>
					<SlimButton>View</SlimButton>
				</ButtonColumn>
			</PosRow>
		</CardListItem>
	);
};

export default ClassCard;
