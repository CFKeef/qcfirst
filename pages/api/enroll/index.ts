import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import withSession from "../../../util/session";
import { Course } from "@prisma/client";

type EnrollmentRequest = {
	courseID: number;
	userID: number;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const validate = async () => {
			// Check if full
			const course: Course | null = await prisma.course.findFirst({
				where: {
					id: data.courseID,
				},
			});

			if (course?.capacity === 30) return false;
		};
		const data: EnrollmentRequest = req.body;
		let result = null;
		if (validate()) {
			result = await prisma.course.update({
				where: {
					id: data.courseID,
				},
				data: {
					enrolled: {
						connect: { id: data.userID },
					},
				},
			});
		}

		if (result) res.status(200).json({ success: "Success!" });
		else res.status(500).json({ Error: "Error with info provided" });
	}
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withSession(handler as any);
