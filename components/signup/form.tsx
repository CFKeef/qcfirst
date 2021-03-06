import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
	Container,
	AccountForm,
	IconInput,
	Button,
	AnchorText,
	TextLinkAnchor,
	SemanticAnchorText,
} from "../general/styledcomponents";
import { IoMail, IoKey, IoInformationCircle } from "react-icons/io5";
import styled from "styled-components";
import Link from "next/link";
import Axios from "axios";
import Note from "../general/note";
import Spinner from "../general/spinner";

type FormData = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

const IconInputContainer = styled.div`
	position: relative;
`;

const ButtonList = styled.ul`
	list-style-type: none;
	display: flex;
	flex-direction: row;
`;

const SwitchButton = styled.button<{ position?: string; active?: boolean }>`
	min-width: 80px;
	height: var(--small-button);
	border-radius: ${({ position }) =>
		position === "left" ? "5px 0 0 5px" : "0 5px 5px 0"};
	border: 2px solid var(--accent2);
	background-color: ${({ active }) =>
		active ? "var(--accent1)" : "var(--bg)"};
	cursor: pointer;

	span {
		color: var(--fg);
		font-size: 0.8rem;
		font-weight: ${({ active }) => (active ? "bold" : "normal")};
		letter-spacing: var(--letter-spacing);
	}
`;

const Form: React.FunctionComponent = () => {
	const { register, handleSubmit, errors } = useForm<FormData>();
	const [userType, setUserType] = useState("Student");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const onSubmit = (data: FormData) => {
		setLoading(true);
		Axios.post("/api/signup", { ...data, userType })
			.then((res) => {
				setLoading(false);
				// Success
				if (res.status === 200) {
					router.replace("/success/signup");
				}
			})
			.catch((err) => {
				setLoading(false);
				setError(true);
				console.log(err);
			});
	};

	const generateErrorComponent = () => {
		if (error)
			return (
				<Note type="Error" message={"Issues with details provided"} />
			);
	};

	const generateSwitch = () => {
		const handleRadiusSelection = (index: number) => {
			// If index == 0 then it should be styled with left
			if (index === 0) return "left";
			// If indedx == end then it should be right
			else if (index + 1 === optionSet.length) return "right";
		};
		const optionSet = ["Student", "Teacher"];

		return (
			<ButtonList>
				{optionSet.map((option, index) => {
					return (
						<li key={option + index}>
							<SwitchButton
								active={userType === option}
								position={handleRadiusSelection(index)}
								type="button"
								onClick={() => setUserType(option)}
							>
								<span>{option}</span>
							</SwitchButton>
						</li>
					);
				})}
			</ButtonList>
		);
	};

	return (
		<Container style={{ margin: "2rem 0" }}>
			{generateErrorComponent()}
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
				<SemanticAnchorText
					style={{
						display: "flex",
						justifyContent: "space-between",
						flexDirection: "row",
					}}
				>
					What are you? {generateSwitch()}{" "}
				</SemanticAnchorText>

				<Button topSpace={true}>
					{loading ? <Spinner /> : "Register"}
				</Button>
				<AnchorText>
					Forgot your info? Recover it
					<Link href="/recover" prefetch={false}>
						<TextLinkAnchor>here!</TextLinkAnchor>
					</Link>
				</AnchorText>
				<AnchorText>
					Have an account? Sign in
					<Link href="/" prefetch={false}>
						<TextLinkAnchor>here!</TextLinkAnchor>
					</Link>
				</AnchorText>
			</AccountForm>
		</Container>
	);
};

export default Form;
