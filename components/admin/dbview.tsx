import React from "react";
import styled from "styled-components";
import { PageTitleText } from "../../pages/create";
import Link from "next/link";
import { SlimButton } from "../general/styledcomponents";

const TableGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 1rem;
	grid-row-gap: 1rem;
	height: 100%;
	width: 100%;
`;

const DatabaseView = () => {
	return (
		<React.Fragment>
			<PageTitleText>Admin Panel</PageTitleText>
			<TableGrid>
				<Link href={"/admin/table/student"}>
					<a>
						<SlimButton>Student</SlimButton>
					</a>
				</Link>
				<Link href={"/admin/table/instructor"}>
					<a>
						<SlimButton>Instructor</SlimButton>
					</a>
				</Link>
				<Link href={"/admin/table/course"}>
					<a>
						<SlimButton>Course</SlimButton>
					</a>
				</Link>
				<Link href={"/admin/table/searches"}>
					<a>
						<SlimButton>Searches</SlimButton>
					</a>
				</Link>
			</TableGrid>
		</React.Fragment>
	);
};

export default DatabaseView;
