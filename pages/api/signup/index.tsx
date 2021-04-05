import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import bcrypt from "bcryptjs";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = req.body;

		let user;
		// Hash Pw
		const hashedPw = await bcrypt.hash(data.Password, 10);
		// Save to db
		if (data.userType === "Student") {
			user = await prisma.student
				.create({
					data: {
						studentID: Math.floor(Math.random() * 100000),
						email: data.Email,
						firstName: data.firstName,
						lastName: data.lastName,
						password: hashedPw,
					},
				})
				.catch((e: Error) => {
					res.send({ Error: `${e.name}` });
				})
				.finally(() => prisma.$disconnect);
		} else if (data.userType === "Teacher") {
			user = await prisma.instructor
				.create({
					data: {
						email: data.Email,
						firstName: data.firstName,
						lastName: data.lastName,
						password: hashedPw,
					},
				})
				.catch((e: Error) => {
					res.send({ Error: `${e.name}` });
				})
				.finally(() => prisma.$disconnect);
		} else {
			res.send("Issue with Usertype creation");
		}

		if (user) res.send("Signed up!");
	}
);

export default handler;
