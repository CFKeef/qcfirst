import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import withSession from "../../../util/session";
import prisma from "../../../util/prisma";
import { Instructor } from "@prisma/client";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const { type } = req.query;
		let data;

		if (type === "instructor") {
			const user = await prisma.instructor.findUnique({
				where: {
					id: parseInt(req.body.id),
				},
			});

			if (user)
				data = await prisma.course.findMany({
					where: {
						instructorId: user.id,
					},
				});
		}

		if (data) {
			res.status(200).send(data);
		}
	}
);

export default withSession(handler as any);
