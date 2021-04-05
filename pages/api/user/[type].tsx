import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import withSession from "../../../util/session";
import prisma from "../../../util/prisma";

const getInstructorData = async (id: number) => {
	const user = await prisma.instructor.findUnique({
		where: {
			id: parseInt(id),
		},
		include: {
			coursesTeaching: {
				include: {
					enrolled: {
						select: {
							id: true,
							studentID: true,
							firstName: true,
							lastName: true,
						},
					},
				},
			},
		},
	});
	if (user) return user.coursesTeaching;
	else return null;
};

const getStudentData = async (id: number) => {
	const user = await prisma.student.findUnique({
		where: {
			id: parseInt(id),
		},
		include: {
			coursesEnrolled: {
				include: {
					instructor: true,
				},
			},
		},
	});
	if (user) return user.coursesEnrolled;
	else return null;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const { type } = req.query;
		const id = req.body.id;

		const data =
			type === "instructor"
				? await getInstructorData(id)
				: await getStudentData(id);

		if (data) res.status(200).json({ courses: data });
		else res.status(500).json({ courses: [] });
	}
);

export default withSession(handler as any);
