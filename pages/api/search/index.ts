/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import withSession from "../../../util/session";
import { SearchForm } from "../../../components/search/form";
import { Course } from "@prisma/client";

interface SearchFormRequest extends SearchForm {
	userID: number;
}

const updateSearches = async (query: Query, results: Course[], id: number) => {
	await prisma.searches.create({
		data: {
			query: JSON.stringify(query),
			results: JSON.stringify(results),
			searchedBy: {
				connect: {
					id: id,
				},
			},
		},
	});
};

type Query = {
	semester?: string;
	name?: string;
	department?: string;
	deadline?: { gte: Date };
	startTime?: { gte: string };
	endTime?: { lte: string };
	daysScheduled?: { contains: string };
	status?: number;
};

const buildPrismaQuery = (data: SearchFormRequest) => {
	const query: Query = {};

	query.semester = data.Semester.value;

	query.department = data.Department.value;

	if (data.CourseName?.length > 0) query.name = data.CourseName;

	query.deadline = { gte: new Date() };

	if (data.Scheduled) {
		const str = data.Scheduled.map((day) => {
			return day.value;
		}).join("");

		query.daysScheduled = { contains: str };
	}

	return query;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const id = req.body.id;
		const data: SearchFormRequest = req.body.data;
		const query = buildPrismaQuery(data);
		// Need to find what fields to use in filter
		const result = await prisma.course.findMany({
			where: {
				AND: [query],
			},
			include: {
				enrolled: true,
				instructor: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
			},
		});
		if (result) {
			await updateSearches(query, result, id);
			res.status(200).json({ courses: result });
		} else res.status(500).json({ Error: "Error with info provided" });
	}
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withSession(handler as any);
