import Head from "next/head";
import React from "react";
import { SPAContentContainer } from "../../../components/general/spa";
import { Page } from "../../../components/general/styledcomponents";
import {
	PageTitleText,
	PositionContainer,
	ResponsiveContainer,
} from "../../create";
import { useQuery } from "react-query";
import { fetchDataByTableName } from "../../../util/fcs";

const TableView = ({ table }) => {
	const { data, isLoading } = useQuery(
		`${table}`,
		async () => await fetchDataByTableName(table)
	);

	return (
		<Page>
			<Head>
				<title>Viewing Table</title>
			</Head>
			<SPAContentContainer>
				<PositionContainer>
					<ResponsiveContainer>
						<PageTitleText>Viewing {table} Table</PageTitleText>
					</ResponsiveContainer>
				</PositionContainer>
			</SPAContentContainer>
		</Page>
	);
};

export default TableView;

export const getServerSideProps = async ({ query }) => {
	return {
		props: {
			table: query.table,
		},
	};
};
