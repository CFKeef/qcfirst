import React from "react";
import { useForm } from "react-hook-form";
import {
	Container,
	AccountForm,
	IconInput,
	Button,
	AnchorText,
	TextLinkAnchor,
} from "../styledcomponents";
import { IoMail, IoKey, IoInformationCircle } from "react-icons/io5";
import styled from "styled-components";
import Link from "next/link";

type FormData = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: "Student" | "Teacher";
};

const IconInputContainer = styled.div`
	position: relative;
`;

const Form = () => {
	const { register, handleSubmit, errors } = useForm<FormData>();
	const onSubmit = (data: FormData) => console.log(data);

	return (
		<Container style={{ margin: "2rem 0" }}>
			<AccountForm onSubmit={handleSubmit(onSubmit)}>
				<IconInputContainer>
					<IconInput
						placeholder={"First Name"}
						type="text"
						name="firstName"
						ref={register({ required: true })}
					/>
					<IoInformationCircle
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
						placeholder={"Last Name"}
						type="text"
						name="lastName"
						ref={register({ required: true })}
					/>
					<IoInformationCircle
						style={{
							position: "absolute",
							left: "10px",
							top: "36px",
							fill: "var(--accent2)",
						}}
					/>
				</IconInputContainer>
				<IconInputContainer>
					<IconInput
						topSpace={true}
						placeholder={"Email Address"}
						type="email"
						name="Email"
						ref={register({ required: true })}
					/>
					<IoMail
						style={{
							position: "absolute",
							left: "10px",
							top: "36px",
							fill: "var(--accent2)",
						}}
					/>
				</IconInputContainer>
				{errors.email && <span>Not a valid email</span>}
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
				<Button topSpace={true}>Register</Button>
				<AnchorText>
					Forgot your info? Recover it
					<Link href="/recover">
						<TextLinkAnchor>here!</TextLinkAnchor>
					</Link>
				</AnchorText>
				<AnchorText>
					Have an account? Sign in
					<Link href="/">
						<TextLinkAnchor>here!</TextLinkAnchor>
					</Link>
				</AnchorText>
			</AccountForm>
		</Container>
	);
};

export default Form;
