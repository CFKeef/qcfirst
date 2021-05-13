import React from "react";
import styled from "styled-components";
import { PageTitleText } from "../../pages/create";
import Link from "next/link";

const TableGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
	height: 80vh;
	width: 100%;
`;

const Anchor = styled.a`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--text);
	border: 2px solid var(--text);
	text-transform: capitalize;

	&:hover {
		opacity: 0.8;
	}
`;

const DatabaseView: React.FunctionComponent = () => {
	const generateTables = () => {
		const list = ["student", "instructor", "course", "searches"];

		return list.map((table) => {
			return (
				<Link href={"/admin/table/" + table} passHref={true}>
					<Anchor>{table} Table</Anchor>
				</Link>
			);
		});
	};
	return (
		<React.Fragment>
			<PageTitleText>Admin Panel</PageTitleText>
			<TableGrid>{generateTables()}</TableGrid>
		</React.Fragment>
	);
};

export default DatabaseView;
