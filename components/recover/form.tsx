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
import { IoMail } from "react-icons/io5";
import styled from "styled-components";
import Link from "next/link";

type FormData = {
	email: string;
};

const IconInputContainer = styled.div`
	position: relative;
`;

const Form: React.FunctionComponent = () => {
	const { register, handleSubmit } = useForm<FormData>();
	const onSubmit = (data: FormData) => console.log(data);

	return (
		<Container style={{ margin: "2rem 0" }}>
			<AccountForm onSubmit={handleSubmit(onSubmit)}>
				<IconInputContainer>
					<IconInput
						placeholder={"Email Address"}
						type="email"
						name="email"
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
				<Button topSpace={true}>Recover</Button>
				<AnchorText>
					Remember your info? Log in
					<Link href="/" prefetch={false}>
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
