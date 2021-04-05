import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import bcrypt from "bcryptjs";
import withSession from "../../../util/session";

type FormData = {
	Email: string;
	Password: string;
	userType: "Student" | "Instructor";
};

const comparePassToHash = async (pw: string, hash: string) => {
	return await bcrypt.compare(pw, hash);
};

const handleStudentLogin = async (
	data: FormData,
	req: AuthorizedRequest,
	res: NextApiResponse
) => {
	const student = await prisma.student
		.findUnique({
			where: {
				email: data.Email,
			},
		})
		.catch((err) => {
			res.send({ Error: `${err.name} 1` });
		});

	if (student) {
		const match = await comparePassToHash(data.Password, student.password);

		if (match) {
			req.session.set("user", {
				id: student.id,
				studentID: student.studentID,
				email: student.email,
				firstName: student.firstName,
				lastName: student.lastName,
				isStudent: true,
			});
			await req.session.save();
			res.send({ Success: "Logged in!" });
		} else {
			res.send({ Error: "Issue with details provided 2" });
		}
	} else {
		res.send({ Error: "Not a user 3" });
	}
};

const handleInstrutorLogin = async (
	data: FormData,
	req: AuthorizedRequest,
	res: NextApiResponse
) => {
	const teacher = await prisma.instructor
		.findUnique({
			where: {
				email: data.Email,
			},
		})
		.catch((err) => {
			res.send({ Error: `${err.name} 31` });
		});

	if (teacher) {
		const match = await comparePassToHash(data.Password, teacher.password);
		if (match) {
			req.session.set("user", {
				email: teacher.email,
				id: teacher.id,
				firstName: teacher.firstName,
				lastName: teacher.lastName,
				isStudent: false,
			});
			await req.session.save();
			res.send({ Success: "Logged in!" });
		} else {
			res.send({ Error: "Issue with details provided 11" });
		}
	} else {
		res.send({ Error: "Not Registered with us 21" });
	}
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = req.body;

		data.userType === "Student"
			? handleStudentLogin(data, req, res)
			: handleInstrutorLogin(data, req, res);
	}
);

export default withSession(handler as any);
