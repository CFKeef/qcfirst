import React from "react";
import { Controller, Control } from "react-hook-form";
import Select from "react-select";
import { InputLabel } from "../../general/styledcomponents";
import styled from "styled-components";
import { useTheme } from "next-themes";

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
	id: string;
}
const CustomSelect = styled(Select)`
	.Select__control {
		background-color: var(--bg);
		border: var(--accent2) 1px solid;
		box-shadow: none;
		outline: none;
		&:hover {
			border-color: var(--fg);

			.Select__indicators {
				svg {
					color: var(--fg);
				}
			}
		}

		.Select__indicators {
			transition: all 0.3s ease;
			transform: rotate(180deg);

			svg {
				color: var(--accent2);
			}
		}
	}
	.Select__indicator-separator {
		display: none;
	}

	.Select__control--menu-is-open > .Select__indicators {
		transition: all 0.3s ease;
		transform: rotate(0deg);
		svg {
			color: var(--fg);
		}
	}
	.Select__single-value {
		color: var(--fg);
	}
	.Select__menu {
		background-color: var(--bg);
		border: var(--accent2) 1px solid;
		color: var(--fg);

		.Select__menu-list {
			.Select__option {
				&:hover {
					background-color: var(--fg);
					color: var(--bg);
					cursor: pointer;
				}
			}
			.Select__option--is-selected {
				background-color: var(--fg);
				color: var(--bg);
			}
		}
	}
`;

const DropDown: React.FunctionComponent<DropDownProps> = ({
	fieldName,
	data,
	control,
	id,
}) => {
	const drop = <CustomSelect classNamePrefix={"Select"} instanceId={id} />;

	return (
		<DropDownContainer>
			<InputLabel>{fieldName}</InputLabel>
			<Controller
				as={drop}
				name={fieldName}
				options={data}
				control={control}
				defaultValue={data[0]}
			/>
		</DropDownContainer>
	);
};

export default DropDown;
