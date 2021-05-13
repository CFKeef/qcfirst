import { Course } from "@prisma/client";
import React from "react";
import { CourseResponse } from "../../dashboard/classcard";
import { Header, ParagraphText, SlimButton } from "../styledcomponents";
import styled from "styled-components";

const ModalBackground = styled.div`
	z-index: 5;
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
	z-index: 6;
	position: fixed;
	border: 2px solid var(--accent3);
	background: var(--bg);
	width: 33%;
	height: auto;
	border-radius: 10px;
	padding: 0.75rem;
	color: rgba(0, 0, 139, 0.7);
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
`;

const ModalFieldText = styled.span`
	font-size: 0.8rem;
	color: var(--accent5);
	text-transform: uppercase;
	margin: 0.5rem 0;
	letter-spacing: var(--letter-spacing);
	width: 100%;
	text-align: left;
`;

const ModalText = styled(ParagraphText)`
	text-transform: capitalize;
`;

const EnrolledList = styled.ul`
	max-height: 10rem;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	border: 2px solid var(--accent3);
	width: 100%;
	border-radius: var(--border-radius);
	list-style-type: none;
	padding: 0.25rem 0.5rem;
	margin: 0 0 1rem 0;

	li {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	width: 100%;
	margin: 0.5rem 0 0 0;

	button {
		width: 45%;
	}
`;

interface CourseModalProps {
	course: Course | CourseResponse | undefined;
	closeModal: () => void;
	isStudent: boolean;
	dropClass: () => void;
}

const CourseModal: React.FunctionComponent<CourseModalProps> = ({
	course,
	closeModal,
	isStudent,
}) => {
	const generateInstructorFields = () => {
		return (
			<React.Fragment>
				<ModalFieldText>Current Enrollment</ModalFieldText>
				<ModalText>
					{(course as CourseResponse).enrolled?.length}/
					{course?.capacity}
				</ModalText>
				<ModalFieldText>
					Current Enrolled Students (Name, StudentID)
				</ModalFieldText>
				<EnrolledList>
					{(course as CourseResponse).enrolled?.map(
						(element: {
							studentID: number;
							firstName: string;
							lastName: string;
							id: number;
						}) => {
							return (
								<li key={element.studentID}>
									<ModalText>
										{element.firstName} {element.lastName}
									</ModalText>
									<ModalText>{element.studentID}</ModalText>
								</li>
							);
						}
					)}
				</EnrolledList>

				<SlimButton onClick={() => closeModal()}>Close</SlimButton>
			</React.Fragment>
		);
	};

	const generateStudentFields = () => {
		return (
			<React.Fragment>
				<ButtonGroup>
					<SlimButton onClick={() => closeModal()}>Close</SlimButton>
				</ButtonGroup>
			</React.Fragment>
		);
	};

	return (
		<React.Fragment>
			<ModalBackground onClick={() => closeModal()}></ModalBackground>
			<ModalContainer>
				<Header>{course?.name}</Header>
				<ModalFieldText>Semester</ModalFieldText>
				<ModalText>{course?.semester}</ModalText>
				<ModalFieldText>Department</ModalFieldText>
				<ModalText>{course?.department}</ModalText>
				<ModalFieldText>Description</ModalFieldText>
				<ModalText>{course?.description}</ModalText>
				<ModalFieldText>Time Scheduled</ModalFieldText>
				<ModalText>
					{course?.startTime}-{course?.endTime}
				</ModalText>
				<ModalFieldText>Days Scheduled</ModalFieldText>
				<ModalText>{course?.daysScheduled}</ModalText>
				{!isStudent && generateInstructorFields()}
				{isStudent && generateStudentFields()}
			</ModalContainer>
		</React.Fragment>
	);
};

export default CourseModal;
