import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import withSession from "../../../util/session";
import { SearchForm } from "../../../components/search/form";

interface SearchFormRequest extends SearchForm {
	userID: number;
}

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data: SearchFormRequest = req.body.data;

		// Need to find what fields to use in filter
		const result = await prisma.course.findMany({
			where: {
				semester: data.Semester.value,
				// name: data.CourseName.length > 0 ? data.CourseName : undefined ,
				// department: data.Department?.value,
				// status: data.status,
				// daysScheduled: {
				//     contains:
				//}
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
		if (result) res.status(200).json({ courses: result });
		else res.status(500).json({ Error: "Error with info provided" });
	}
);

export default withSession(handler as any);
