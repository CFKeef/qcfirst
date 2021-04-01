import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DropDown from "../general/input/dropdown";
import { Button, InputLabel } from "../general/styledcomponents";
import {
	days,
	departments,
	Option,
	semesters,
	statuses,
} from "../create/data/data";
import { Input } from "../general/styledcomponents";
import Multicheckbox from "../general/input/multicheckbox";
import { FieldSpan, FormContainer, FormProps } from "../create/form";
import axios from "axios";
import { Course } from "@prisma/client";

export type SearchForm = {
	CourseName: string;
	Department: Option;
	startTime: string;
	endTime: string;
	Semester: Option;
	Scheduled: Option[];
	status: number;
};

interface SearchFormProps extends FormProps {
	setResults: React.Dispatch<React.SetStateAction<Course[] | null>>;
}

const Form: React.FunctionComponent<SearchFormProps> = ({
	userID,
	setResults,
}) => {
	const { register, handleSubmit, control } = useForm();
	const [err, setErr] = useState(false);
	const onSubmit = async (data: SearchForm) => {
		await axios
			.post("/api/search", { data: data, id: userID })
			.then((res) => {
				if (res) setResults(res.data.courses);
			})
			.catch((err) => {
				if (err) setErr(err);
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
				ref={register({ max: 50, required: false })}
			/>
			<FieldSpan />
			<InputLabel>Start Time</InputLabel>
			<Input
				name="StartTime"
				type={"time"}
				ref={register({ required: false })}
			/>
			<FieldSpan />
			<InputLabel>End Time</InputLabel>
			<Input
				name="EndTime"
				type={"time"}
				ref={register({ required: false })}
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
			<DropDown
				fieldName="Status"
				data={statuses}
				control={control}
				id={"status"}
			/>
			<FieldSpan />
			<Button type="submit">Search</Button>
		</FormContainer>
	);
};

export default Form;
