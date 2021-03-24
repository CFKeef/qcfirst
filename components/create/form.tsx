import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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

const FormContainer = styled.section``;

const Form = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data: ClassForm) => {
		console.log(JSON.stringify(data));
	};

	return (
		<FormContainer>
			<form onSubmit={handleSubmit(onSubmit)}></form>
		</FormContainer>
	);
};
