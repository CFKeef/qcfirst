import React from "react";
import { useForm } from "react-hook-form";
import {
	Container,
	AccountForm,
	IconInput,
	Button,
	AnchorText,
	TextLinkAnchor,
} from "../general/styledcomponents";
import { IoMail, IoKey } from "react-icons/io5";
import styled from "styled-components";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";
type FormData = {
	email: string;
	password: string;
};

const IconInputContainer = styled.div`
	position: relative;
`;

const Form: React.FunctionComponent = () => {
	const router = useRouter();
	const { register, handleSubmit, errors } = useForm<FormData>();
	const onSubmit = (data: FormData) =>
		Axios.post("/api/login", data).then((res) => {
			// Success
			if (res.status === 200) router.replace("/dashboard");
			// Error
		});

	return (
		<Container style={{ margin: "2rem 0" }}>
			<AccountForm onSubmit={handleSubmit(onSubmit)}>
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
				<Button topSpace={true}>Login</Button>
				<AnchorText>
					Forgot your info? Recover it
					<Link href="/recover" prefetch={false}>
						<TextLinkAnchor>here!</TextLinkAnchor>
					</Link>
				</AnchorText>
				<AnchorText>
					Need an account? Sign up
					<Link href="/signup" prefetch={false}>
						<TextLinkAnchor>here!</TextLinkAnchor>
					</Link>
				</AnchorText>
			</AccountForm>
		</Container>
	);
};

export default Form;
