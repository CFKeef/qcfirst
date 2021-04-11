import React from "react";
import { Controller } from "react-hook-form";
import { InputLabel } from "../../general/styledcomponents";
import { DropDownProps, CustomSelect, DropDownContainer } from "./dropdown";

const Multicheckbox: React.FunctionComponent<DropDownProps> = ({
	fieldName,
	data,
	control,
	id,
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
			<InputLabel htmlFor={fieldName}>{fieldName}</InputLabel>
			<Controller
				as={drop}
				name={fieldName}
				options={data}
				control={control}
				defaultValue={null}
			/>
		</DropDownContainer>
	);
};

export default Multicheckbox;
