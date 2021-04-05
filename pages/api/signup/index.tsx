import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";
import bcrypt from "bcryptjs";

type FormData = {
	Email: string;
	firstName: string;
	lastName: string;
	Password: string;
};

const handleInstructorSignUp = async (data: FormData) => {
	const hashedPw = await bcrypt.hash(data.Password, 10);
	const user = await prisma.instructor
		.create({
			data: {
				email: data.Email,
				firstName: data.firstName,
				lastName: data.lastName,
				password: hashedPw,
			},
		})
		.catch((e: Error) => {
			console.log(e);
		});

	if (user) return true;
	else return false;
};

const handleStudentSignUp = async (data: FormData) => {
	const hashedPw = await bcrypt.hash(data.Password, 10);
	const user = await prisma.student
		.create({
			data: {
				studentID: Math.floor(100000000 + Math.random() * 900000000),
				email: data.Email,
				firstName: data.firstName,
				lastName: data.lastName,
				password: hashedPw,
			},
		})
		.catch((e: Error) => {
			console.log(e);
		});

	if (user) return true;
	else return false;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = req.body;

		const userCreated =
			data.userType === "Student"
				? await handleStudentSignUp(data)
				: await handleInstructorSignUp(data);

		if (userCreated) res.status(200).json({ Success: "Signed up!" });
		else res.status(500).json({ Error: "Sign up failed" });
	}
);

export default handler;
