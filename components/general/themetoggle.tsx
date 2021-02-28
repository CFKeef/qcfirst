import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { ParagraphText } from "./styledcomponents";

const ToggleWrapper = styled.label`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
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

	if (!isMounted) return null;

	return (
		<ToggleWrapper>
			<ParagraphText style={{ marginRight: ".5REM" }}>
				{theme === "light" ? "Light Theme" : "Dark Theme"}
			</ParagraphText>
			<Toggle
				defaultChecked={theme === "light" ? true : false}
				icons={false}
				onChange={(e) => {
					handleChange(e.target.checked);
				}}
			/>
		</ToggleWrapper>
	);
};

export default ThemeToggle;
