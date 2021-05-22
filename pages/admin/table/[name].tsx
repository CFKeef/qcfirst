/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-nocheck
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { SPAContentContainer } from "../../../components/general/spa";
import { Page, SlimButton } from "../../../components/general/styledcomponents";
import { fetchTableByName } from "../../../util/prisma";
import {
	PageTitleText,
	PositionContainer,
	ResponsiveContainer,
} from "../../create";
import { useRouter } from "next/router";
import Link from "next/link";

const View = ({ data }) => {
	const router = useRouter();

	const determineContent = () => {
		const generateStudentTable = () => {
			const jsonData = JSON.parse(data);

			return (
				<table>
					<thead>
						<tr>
							{Object.keys(jsonData[0]).map((key) => {
								return <th key={key + "cellHeader"}>{key}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{jsonData.map((entry) => {
							return (
								<tr key={entry.email + "row"}>
									<td>{entry.id}</td>
									<td>{entry.studentID}</td>
									<td>{entry.email}</td>
									<td>{entry.firstName}</td>
									<td>{entry.lastName}</td>
									<td>{entry.password}</td>
									<td>true</td>
									<td>
										<ul>
											{entry.coursesEnrolled.map(
												(course) => {
													return (
														<li
															key={
																entry.email +
																"course" +
																course.id
															}
														>
															{course.id}:
															{course.name}
														</li>
													);
												}
											)}
										</ul>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		};

		const generateInstructorTable = () => {
			const jsonData = JSON.parse(data);

			return (
				<table>
					<thead>
						<tr>
							{Object.keys(jsonData[0]).map((key) => {
								return <th key={key + "cellHeader"}>{key}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{jsonData.map((entry) => {
							return (
								<tr key={entry.email + "row"}>
									<td>{entry.id}</td>
									<td>{entry.email}</td>
									<td>{entry.firstName}</td>
									<td>{entry.lastName}</td>
									<td>{entry.password}</td>
									<td>true</td>
									<td>
										<ul>
											{entry.coursesTeaching.map(
												(course) => {
													return (
														<li
															key={
																entry.email +
																"course" +
																course.id
															}
														>
															{course.id}:
															{course.name}
														</li>
													);
												}
											)}
										</ul>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		};

		const generateCoursesTable = () => {
			const jsonData = JSON.parse(data);

			return (
				<table>
					<thead>
						<tr>
							{Object.keys(jsonData[0]).map((key) => {
								return <th key={key + "cellHeader"}>{key}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{jsonData.map((entry) => {
							return (
								<tr key={entry.id + "row"}>
									{Object.values(entry).map(
										(value, index) => {
											return (
												<td
													key={
														"valueCell" +
														value +
														index +
														entry.id
													}
												>
													{value}
												</td>
											);
										}
									)}
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		};

		const generateSearchesTable = () => {
			const jsonData = data;

			return (
				<table>
					<thead>
						<tr>
							{Object.keys(jsonData[0]).map((key) => {
								return <th key={key + "cellHeader"}>{key}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{jsonData.map((entry) => {
							return (
								<tr key={entry.id + "row"}>
									<th>{entry.id}</th>
									<th>
										<ul>
											{Object.entries(
												entry.query.query
											).map((queryEntry) => {
												return (
													<li
														key={
															"queryEntryCell" +
															queryEntry[0] +
															entry.id
														}
													>
														{queryEntry[0]}:
														{JSON.stringify(
															queryEntry[1]
														)}
													</li>
												);
											})}
										</ul>
									</th>
									<th>
										<ul>
											{entry.results.results.map(
												(result) => {
													return (
														<li
															key={
																"resultEntryCell" +
																result.id +
																entry.id
															}
														>
															{result.id}
														</li>
													);
												}
											)}
										</ul>
									</th>
									<th>{entry.studentId}</th>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		};

		if (router.query.name === "student") {
			return generateStudentTable();
		} else if (router.query.name === "instructor") {
			return generateInstructorTable();
		} else if (router.query.name === "course") {
			return generateCoursesTable();
		} else if (router.query.name === "search") {
			return generateSearchesTable();
		}
	};
	return (
		<Page>
			<Head>
				<title>Viewing {router.query.name} Table</title>
			</Head>
			<SPAContentContainer>
				<PositionContainer>
					<ResponsiveContainer>
						<PageTitleText>
							Viewing {router.query.name} Table
						</PageTitleText>
						<Link href={"/admin"}>
							<a>
								<SlimButton>Back</SlimButton>
							</a>
						</Link>
						{determineContent()}
					</ResponsiveContainer>
				</PositionContainer>
			</SPAContentContainer>
		</Page>
	);
};

export default View;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { name } = context.query;

	let data;

	name ? (data = await fetchTableByName(name as string)) : (data = null);

	data && name !== "search" ? (data = JSON.stringify(data)) : data;

	return {
		props: {
			data: data,
		},
	};
};
