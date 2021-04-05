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

const handleStudentLogin = async (data: FormData, req: AuthorizedRequest) => {
	const student = await prisma.student
		.findUnique({
			where: {
				email: data.Email,
			},
		})
		.catch((err) => {
			console.log(err);
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
			return true;
		}
	}

	return false;
};

const handleInstrutorLogin = async (data: FormData, req: AuthorizedRequest) => {
	const teacher = await prisma.instructor
		.findUnique({
			where: {
				email: data.Email,
			},
		})
		.catch((err) => {
			console.log(err);
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
			return true;
		}
	}

	return false;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = req.body;

		const result =
			data.userType === "Student"
				? await handleStudentLogin(data, req)
				: await handleInstrutorLogin(data, req);

		if (result) {
			res.status(200).json({ Success: "Logged in!" });
		} else {
			res.status(500).json({ Error: "Something went wrong :(" });
		}
	}
);

export default withSession(handler as any);
