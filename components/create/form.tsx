import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import DropDown from "../general/input/dropdown";
import { InputLabel, TextBox } from "../general/styledcomponents";
import { days, departments, semesters } from "./data/data";
import { Input } from "../general/styledcomponents";
import Checkbox from "../general/input/checkbox";
import { SelectItem } from "../general/input/Checkboxlist";

type ClassForm = {
	CourseName: string;
	Department: string;
	Description: string;
	startTime: string;
	endTime: string;
	Semester: string;
	Days: SelectModel[] | undefined;
};

interface SelectModel {
	days: SelectItem[];
}
const FormContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 45%;
	padding: 2rem 1rem;
	border: 1px solid var(--accent3);
`;

const FieldSpan = styled.br`
	margin: 0.5rem 0;
`;

const Form = () => {
	const { register, handleSubmit, control, getValues, setValue } = useForm({
		defaultValues: {
			days: {
				selected: [
					{
						days: days.map((day) => {
							return {
								id: day.value,
								name: day.label,
								selected: day.selected,
							};
						}),
					},
				],
			},
		},
	});

	const { fields, append } = useFieldArray({
		control,
		name: "days.selected",
	});

	const addToArrayField = () => {
		append({});
	};

	const onSubmit = (data: ClassForm) => {
		console.log(JSON.stringify(data));
	};

	const generateCheckBoxes = () => {
		console.log(getValues("Days"));
		return (
			<ul>
				{days.map((element) => {
					return (
						<li key={element.label}>
							<input
								type={"checkbox"}
								name={"Days"}
								value={element.selected}
							/>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<FormContainer>
			<DropDown
				fieldName="Semester"
				data={semesters}
				control={control}
				id={"semester"}
			/>
			<FieldSpan />
			<DropDown
				fieldName="Department"
				data={departments}
				control={control}
				id={"department"}
			/>
			<FieldSpan />
			<InputLabel>Course Name</InputLabel>
			<Input
				placeholder={"Course Name"}
				type="text"
				name="CourseName"
				ref={register({ required: true, max: 50 })}
			/>
			<FieldSpan />
			<InputLabel>Description</InputLabel>
			<TextBox
				name="Description"
				placeholder={"Course Description"}
				rows={5}
				ref={register({ required: true, max: 100 })}
			/>
			<FieldSpan />
			<InputLabel>Days Scheduled</InputLabel>
			{generateCheckBoxes()}
		</FormContainer>
	);
};

export default Form;
