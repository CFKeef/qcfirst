import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import withSession from "../../../util/session";

type EnrollmentRequest = {
	courseID: number;
	userID: number;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const validate = () => {
			return true;
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

export default withSession(handler as any);
