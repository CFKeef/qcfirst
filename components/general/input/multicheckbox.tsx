import React from "react";
import { Controller, Control } from "react-hook-form";
import Select from "react-select";
import { InputLabel } from "../../general/styledcomponents";
import styled from "styled-components";
import { DropDownProps, CustomSelect, DropDownContainer } from "./dropdown";
import { days } from "../../create/data/data";

interface MultiDropDownProps extends DropDownProps {
	register: any;
}

const Multicheckbox: React.FunctionComponent<MultiDropDownProps> = ({
	fieldName,
	data,
	control,
	id,
	register,
}) => {
	const drop = (
		<CustomSelect
			classNamePrefix={"Select"}
			instanceId={id}
			isMulti={true}
		></CustomSelect>
	);

	return (
		<DropDownContainer>
			<InputLabel>{fieldName}</InputLabel>
			<Controller
				as={drop}
				name={fieldName}
				options={data}
				control={control}
			/>
		</DropDownContainer>
	);
};

export default Multicheckbox;
