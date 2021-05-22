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
									{Object.values(entry).map((value) => {
										return (
											<td key={"valueCell" + entry.id}>
												{value}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		};

		const generateSearchesTable = () => {
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
							const queryData = JSON.parse(entry.query);
							const resultData = JSON.parse(entry.results);

							return (
								<tr
									key={
										entry.id +
										"for" +
										entry.studentId +
										"row"
									}
								>
									<td>{entry.id}</td>
									<td>
										<ul>
											{Object.entries(queryData).map(
												(queryEntry, index) => {
													return (
														<li
															key={
																"queryForEntry" +
																entry.id +
																index
															}
														>
															{queryEntry[0] +
																":" +
																JSON.stringify(
																	queryEntry[1]
																)}
														</li>
													);
												}
											)}
										</ul>
									</td>
									<td>
										<ul>
											{resultData.map((resultEntry) => {
												return (
													<li>{resultEntry.id}</li>
												);
											})}
										</ul>
									</td>
									<td>ID#:{entry.studentId}</td>
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
		} else if (router.query.name === "searches") {
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

	return {
		props: {
			data: data ? JSON.stringify(data) : null,
		},
	};
};
