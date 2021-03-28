import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import bcrypt from "bcryptjs";
import withSession from "../../../util/session";

const comparePassToHash = async (pw: string, hash: string) => {
	return await bcrypt.compare(pw, hash);
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = req.body;

		let match;
		// Hash pw
		if (data.userType === "Student") {
			const student = await prisma.student
				.findUnique({
					where: {
						email: data.Email,
					},
				})
				.catch((err) => {
					res.status(500).send(err.name + ": Issue with Log in");
				})
				.finally(() => prisma.$disconnect);

			if (student) {
				match = await comparePassToHash(
					data.Password,
					student.password
				);
				if (match) {
					req.session.set("user", {
						id: student.id,
						studentId: student.studentID,
						email: student.email,
						firstName: student.firstName,
						lastName: student.lastName,
						isStudent: true,
					});
					await req.session.save();
					res.send(200);
				} else {
					res.status(401).send("Error: Issue with Log in");
				}
			} else {
				res.status(401).send("Error: Issue with Log in");
			}
		} else if (data.userType === "Teacher") {
			const teacher = await prisma.instructor
				.findUnique({
					where: {
						email: data.Email,
					},
				})
				.catch((err) => {
					res.status(500).send(err.name + ": Issue with Log in");
				})
				.finally(() => prisma.$disconnect);

			if (teacher) {
				match = await comparePassToHash(
					data.Password,
					teacher.password
				);
				if (match) {
					req.session.set("user", {
						email: teacher.email,
						id: teacher.id,
						firstName: teacher.firstName,
						lastName: teacher.lastName,
						isStudent: false,
					});
					await req.session.save();
					res.send(200);
				} else {
					res.status(401).send("Error: Issue with Log in");
				}
			} else {
				res.status(401).send("Error: Issue with Log in");
			}
		}
	}
);

export default withSession(handler as any);
