import Head from "next/head";
import React from "react";
import DatabaseView from "../../components/admin/dbview";
import { SPAContentContainer } from "../../components/general/spa";
import { Page } from "../../components/general/styledcomponents";
import { PositionContainer, ResponsiveContainer } from "../create";

const AdminDash = (): JSX.Element => {
	return (
		<Page>
			<Head>
				<title>Admin Dashboard</title>
			</Head>
			<SPAContentContainer>
				<PositionContainer>
					<ResponsiveContainer>
						<DatabaseView />
					</ResponsiveContainer>
				</PositionContainer>
			</SPAContentContainer>
		</Page>
	);
};

export default AdminDash;
