import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const ToggleWrapper = styled.label`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 0 0.5rem 0 0;
	padding: 0;
	color: var(--fg);
	font-size: 0.8rem;
`;

const Skeleton = styled.div`
	background-color: var(--fg);
`;

const ThemeToggle: React.FunctionComponent = () => {
	const { theme, setTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	const handleChange = (isChecked: boolean) => {
		if (!isChecked) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return <Skeleton />;

	return (
		<Container>
			<ToggleWrapper>
				{theme === "light" ? "Light Theme" : "Dark Theme"}
			</ToggleWrapper>
			<Toggle
				defaultChecked={theme === "light" ? true : false}
				icons={false}
				onChange={(e) => {
					handleChange(e.target.checked);
				}}
			/>
		</Container>
	);
};

export default ThemeToggle;
