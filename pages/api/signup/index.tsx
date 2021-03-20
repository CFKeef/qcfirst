import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthorizedRequest, LoginRes, SignUpRes } from "../../../types/util";
import prisma from "../../../util/prisma";
import bcrypt from "bcrypt";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = req.body;
		console.log(req.body);
		// Hash Pw
		const hashedPw = await bcrypt.hash(data.Password, 10);
		// Save to db
		const student = await prisma.student
			.create({
				data: {
					studentID: Math.floor(Math.random() * 100000),
					email: data.Email,
					firstName: data.firstName,
					lastName: data.lastName,
					password: hashedPw,
				},
			})
			.catch((err) => {
				res.status(401).send({ error: err });
			});

		res.status(200).send("Signed up!");
	}
);

export default handler;
