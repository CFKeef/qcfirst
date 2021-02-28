import React from "react";
import { useForm } from "react-hook-form";
import {
	Container,
	ColumnContainer,
	InputLabel,
	IconInput,
	Button,
} from "../styledcomponents";
import { IoMail, IoKey } from "react-icons/io5";
import styled from "styled-components";

type FormData = {
	email: string;
	password: string;
};

const IconInputContainer = styled.div`
	position: relative;
`;

const Form = () => {
	const { register, handleSubmit, errors } = useForm<FormData>();
	const onSubmit = (data: FormData) => console.log(data);

	return (
		<Container style={{ margin: "2rem 0" }}>
			<form
				style={{ width: "20rem", border: "none" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				<IconInputContainer>
					<IconInput
						placeholder={"Email Address"}
						type="email"
						name="Email"
						ref={register({ required: true })}
					/>
					<IoMail
						style={{
							position: "absolute",
							left: "10px",
							top: "12px",
							fill: "var(--accent2)",
						}}
					/>
				</IconInputContainer>
				<IconInputContainer>
					<IconInput
						topSpace={true}
						placeholder={"Password"}
						type="password"
						name="Password"
						ref={register({ required: true })}
					/>
					<IoKey
						style={{
							position: "absolute",
							left: "10px",
							top: "36px",
							fill: "var(--accent2)",
						}}
					/>
				</IconInputContainer>
				<Button topSpace={true}>Login</Button>
			</form>
		</Container>
	);
};

export default Form;
