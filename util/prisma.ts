/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) global.prisma = new PrismaClient();
	prisma = global.prisma;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchTableByName = async (name: string) => {
	switch (name) {
		case "student":
			return await prisma.student.findMany({
				include: {
					coursesEnrolled: true,
				},
			});
		case "instructor":
			return await prisma.instructor.findMany({
				include: {
					coursesTeaching: true,
				},
			});
		case "course":
			return await prisma.course.findMany();
		case "searches":
			return await prisma.searches.findMany();
		default:
			return null;
	}
};

export default prisma;
