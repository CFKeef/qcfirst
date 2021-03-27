import React from "react";
import styled from "styled-components";

interface CheckBoxProps {
	value: boolean;
	onClick: () => {};
}

const CheckBoxInput = styled.span`
	background-color: var(--bg);
`;

const Checkbox: React.FunctionComponent<CheckBoxProps> = ({
	value,
	onClick,
}) => {
	return (
		<CheckBoxInput onClick={() => onClick()}>
			<input type={"checkbox"} checked={value} />
			<span />
		</CheckBoxInput>
	);
};

export default Checkbox;
