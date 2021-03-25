import React from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import DropDown from "../general/input/dropdown";
import { Input, InputLabel } from "../general/styledcomponents";
import Select from "react-select";
type day = {
	value: string;
	key: number;
};

type ClassForm = {
	courseName: string;
	department: string;
	description: string;
	startTime: string;
	endTime: string;
	days: day[];
};

const FormContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40%;
`;

const semesterOptions = [
	{ value: "fall", label: "Fall" },
	{ value: "winter", label: "Winter" },
	{ value: "spring", label: "Spring" },
	{ value: "summer1", label: "Summer Session 1" },
	{ value: "summer2", label: "Summer Session 2" },
];

const Form = () => {
	const { register, handleSubmit, control } = useForm();
	const onSubmit = (data: ClassForm) => {
		console.log(JSON.stringify(data));
	};

	return (
		<FormContainer>
			<DropDown
				fieldName="Semester"
				data={semesterOptions}
				control={control}
			/>
		</FormContainer>
	);
};

export default Form;
