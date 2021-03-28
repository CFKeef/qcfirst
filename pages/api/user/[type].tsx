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
							enrolled: true,
						},
					},
				},
			});
		}

		if (user) {
			res.status(200).send(user.coursesTeaching);
		} else {
			res.status(500).send("ERROR");
		}
	}
);

export default withSession(handler as any);
