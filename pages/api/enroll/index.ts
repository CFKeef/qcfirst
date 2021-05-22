/* eslint-disable @typescript-eslint/no-explicit-any */
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
			const student: any | null = await prisma.student.findFirst({
				where: {
					id: data.userID,
				},
				include: {
					coursesEnrolled: true,
				},
			});

			const course: any | null = await prisma.course.findFirst({
				where: {
					id: data.courseID,
				},
				include: {
					enrolled: true,
				},
			});
			// Full
			if (course?.capacity === course.enrolled.length) return false;

			// Time Conflict
			const timeConflicts = student?.coursesEnrolled.filter(
				(courseEnrolled: Course) => {
					// If not on same day return false
					if (!course.daysScheduled.includes(course.daysScheduled))
						return false;

					// Check if the enrolled course falls into the interval of newCourse.startTime >= conflicts <= newCourse.endTime
					if (
						parseInt(course.startTime) >=
							parseInt(courseEnrolled.startTime) &&
						parseInt(courseEnrolled.endTime) <=
							parseInt(course.endTime)
					)
						return true;

					return false;
				}
			);

			console.log(timeConflicts.length);

			if (timeConflicts.length > 0) return false;
			else return true;
		};

		const data: EnrollmentRequest = req.body;
		let result = null;
		const hasNoIssues = await validate();

		if (hasNoIssues) {
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
		else res.status(400).json({ Error: "Error with info provided" });
	}
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withSession(handler as any);
