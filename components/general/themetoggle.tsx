import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";

const ToggleSwitch = styled.input``;

const ThemeToggle: React.FunctionComponent = () => {
	const { theme, setTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return (
		<>
			<button onClick={() => setTheme("dark")}>DARK MODE</button>
			<button onClick={() => setTheme("light")}>LIGHT MODE</button>
		</>
	);
};

export default ThemeToggle;
