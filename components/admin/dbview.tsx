import React from "react";
import styled from "styled-components";
import { PageTitleText } from "../../pages/create";
import { QueryFunction } from "react-query";

const TableGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
	height: 100%;
	width: 100%;
`;

interface DBViewProps {
	setView: React.Dispatch<React.SetStateAction<string>>;
}

const DatabaseView: React.FunctionComponent<DBViewProps> = ({ setView }) => {
	return (
		<React.Fragment>
			<PageTitleText>Admin Panel</PageTitleText>
			<TableGrid></TableGrid>
		</React.Fragment>
	);
};

export default DatabaseView;
