/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { PrismaClient } from "@prisma/client";

declare global {
	namespace NodeJS {
		interface Global {
			prisma: PrismaClient;
		}
	}
}

let prisma: PrismaClient;

if (typeof window === "undefined") {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}

	prisma = global.prisma;
}

export default prisma;

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
		case "search":
			return await prisma.$queryRaw(`Select * FROM "Searches"`);
		default:
			return null;
	}
};
