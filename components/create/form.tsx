import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DropDown from "../general/input/dropdown";
import { Button, InputLabel, TextBox } from "../general/styledcomponents";
import { days, departments, semesters } from "./data/data";
import { Input } from "../general/styledcomponents";
import axios from "axios";
import Multicheckbox from "../general/input/multicheckbox";

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
	Scheduled: { value: string; label: string }[];
};

const FormContainer = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 45%;
	padding: 1rem;
	border: 1px solid var(--accent3);
	margin-bottom: 2rem;

	@media (max-width: 30em) {
		width: calc(100% - 40px);
	}
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

interface FormProps {
	userID: number;
}

const Form: React.FunctionComponent<FormProps> = ({ userID }) => {
	const [loading, setLoading] = useState(false);

	const { register, handleSubmit, control } = useForm({
		defaultValues: {
			Capacity: 30,
		},
	});

	const onSubmit = async (data: ClassForm) => {
		setLoading(true);
		await axios.post("/api/create", { data, userID }).then((res) => {
			console.log(res);
		});
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
			<Multicheckbox
				fieldName={"Scheduled"}
				data={days.map((day) => {
					return { label: day.label, value: day.key };
				})}
				control={control}
				id={"day"}
				register={register}
			/>
			<FieldSpan />
			<Button type="submit">Submit</Button>
		</FormContainer>
	);
};

export default Form;
