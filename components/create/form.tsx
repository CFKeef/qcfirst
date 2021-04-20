import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DropDown from "../general/input/dropdown";
import { Button, InputLabel, TextBox } from "../general/styledcomponents";
import { days, departments, semesters } from "./data/data";
import { Input } from "../general/styledcomponents";
import axios from "axios";
import Multicheckbox from "../general/input/multicheckbox";
import { useRouter } from "next/router";
import Spinner from "../general/spinner";

export type ClassForm = {
	CourseName: string;
	Department: string;
	Description: string;
	startTime: string;
	endTime: string;
	Semester: string;
	Capacity: number;
	StartTime: string;
	EndTime: string;
	Scheduled: { value: string; label: string }[];
};

export const FormContainer = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 45%;
	padding: 1rem;
	border: 2px solid var(--accent3);
	margin-bottom: 2rem;

	@media (max-width: 30em) {
		width: calc(100% - 40px);
	}
`;

export const FieldSpan = styled.br`
	margin: 0.5rem 0;
`;

export const InlineFieldGroup = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;
`;

export interface FormProps {
	userID: number;
}

const Form: React.FunctionComponent<FormProps> = ({ userID }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [, setError] = useState(false);

	const { register, handleSubmit, control } = useForm({
		defaultValues: {
			Capacity: 30,
		},
	});

	const onSubmit = async (data: ClassForm) => {
		setLoading(true);

		await axios
			.post("/api/create", { data, userID })
			.then((res) => {
				if (res.status === 200) router.push("/dashboard");
				setLoading(false);
				setError(false);
			})
			.catch((err) => {
				if (err) setError(true);
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
			/>
			<FieldSpan />
			<Button type="submit">{loading ? <Spinner /> : "Submit"}</Button>
		</FormContainer>
	);
};

export default Form;
