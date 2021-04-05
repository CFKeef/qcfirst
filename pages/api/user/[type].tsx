import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import withSession from "../../../util/session";
import prisma from "../../../util/prisma";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const { type } = req.query;
		let user;

		if (type === "instructor") {
			user = await prisma.instructor.findUnique({
				where: {
					id: parseInt(req.body.id),
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
			if (user) res.send({ courses: user.coursesTeaching });
			else res.send({ Error: "Error with details" });
		} else if (type === "student") {
			user = await prisma.student.findUnique({
				where: {
					id: parseInt(req.body.id),
				},
				include: {
					coursesEnrolled: {
						include: {
							instructor: true,
						},
					},
				},
			});
			if (user) res.send({ courses: user.coursesEnrolled });
			else res.send({ Error: "Error with details" });
		} else {
			res.send({ Error: "Error with details" });
		}
	}
);

export default withSession(handler as any);
