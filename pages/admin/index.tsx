import Head from "next/head";
import React, { useState } from "react";
import DatabaseView from "../../components/admin/dbview";
import { SPAContentContainer } from "../../components/general/spa";
import { Page } from "../../components/general/styledcomponents";
import { PositionContainer, ResponsiveContainer } from "../create";

const AdminDash = (): JSX.Element => {
	const [view, setView] = useState("");

	const determineContent = () => {
		switch (view) {
			default:
				return <DatabaseView setView={setView} />;
		}
	};

	return (
		<Page>
			<Head>
				<title>Admin Dashboard</title>
			</Head>
			<SPAContentContainer>
				<PositionContainer>
					<ResponsiveContainer>
						{determineContent()}
					</ResponsiveContainer>
				</PositionContainer>
			</SPAContentContainer>
		</Page>
	);
};

export default AdminDash;
