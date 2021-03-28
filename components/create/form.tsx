import React, { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import DropDown from "../general/input/dropdown";
import { Button, InputLabel, TextBox } from "../general/styledcomponents";
import { days, departments, semesters } from "./data/data";
import { Input } from "../general/styledcomponents";

type ClassForm = {
	CourseName: string;
	Department: string;
	Description: string;
	startTime: string;
	endTime: string;
	Semester: string;
	SundayFlag: boolean;
	MondayFlag: boolean;
	TuesdayFlag: boolean;
	WednesdayFlag: boolean;
	ThursdayFlag: boolean;
	FridayFlag: boolean;
	SaturdayFlag: boolean;
	Capacity: number;
	StartTime: string;
	EndTime: string;
};

const FormContainer = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 45%;
	padding: 1rem;
	border: 1px solid var(--accent3);
`;

const FieldSpan = styled.br`
	margin: 0.5rem 0;
`;

const CheckboxGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	flex: 0 20%;
	margin: 0.5rem;
`;

const CheckBoxList = styled.fieldset`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: row;
	width: 100%;
	flex-wrap: wrap;
	border: none;
`;

const InlineFieldGroup = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
`;

const Form = () => {
	const { register, handleSubmit, control } = useForm({
		defaultValues: {
			Capacity: 30,
		},
	});

	const onSubmit = (data: ClassForm) => {
		console.log(data);
	};

	const generateCheckBoxes = () => {
		return (
			<CheckBoxList>
				{days.map((day) => {
					return (
						<CheckboxGroup key={day.key}>
							<InputLabel style={{ textAlign: "center" }}>
								{day.label}
							</InputLabel>
							<input
								type="checkbox"
								name={day.label + "Flag"}
								ref={register}
							/>
						</CheckboxGroup>
					);
				})}
			</CheckBoxList>
		);
	};

	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
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
			<InlineFieldGroup>
				<InputLabel>Capacity</InputLabel>
				<Input name="Capacity" type={"number"} ref={register} />
			</InlineFieldGroup>
			<FieldSpan />
			<InputLabel>Start Time</InputLabel>
			<Input
				name="StartTime"
				type={"time"}
				ref={register({ required: true })}
			/>
			<FieldSpan />
			<InputLabel>End Time</InputLabel>
			<Input
				name="EndTime"
				type={"time"}
				ref={register({ required: true })}
			/>
			<FieldSpan />
			<InputLabel>Days Scheduled</InputLabel>
			{generateCheckBoxes()}
			<FieldSpan />
			<Button type="submit">Submit</Button>
		</FormContainer>
	);
};

export default Form;
