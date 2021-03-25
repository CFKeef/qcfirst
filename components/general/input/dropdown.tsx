import React from "react";
import { Controller, Control } from "react-hook-form";
import Select from "react-select";
import { InputLabel } from "../../general/styledcomponents";
import styled from "styled-components";

const DropDownContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	width: 100%;

	& > div {
		width: 100%;
	}
`;

type Option = {
	value: string;
	label: string;
};

interface DropDownProps {
	fieldName: string;
	data: Option[];
	control: Control;
}

const DropDown: React.FunctionComponent<DropDownProps> = ({
	fieldName,
	data,
	control,
}) => {
	return (
		<DropDownContainer>
			<InputLabel>{fieldName}</InputLabel>
			<Controller
				as={Select}
				name={fieldName}
				options={data}
				control={control}
			/>
		</DropDownContainer>
	);
};

export default DropDown;
