/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import prisma from "./prisma";

export const makeTimeStringPretty = (time: string): string => {
	const [hour, minutes] = time.split(":");

	const parsedHour = parseInt(hour),
		parsedMinute = parseInt(minutes);

	const convertedHour =
		parsedHour % 12 == 0 ? String(12) : String(parsedHour % 12);

	const convertedMinutes =
		parsedMinute < 10 ? "0" + String(parsedMinute) : String(parsedMinute);

	const isAm = parsedHour < 12;

	return `${convertedHour}:${convertedMinutes}${isAm ? "AM" : "PM"}`;
};

export const fetchDataByTableName = async (table: string) => {
	switch (table) {
		case "instructor":
			return await prisma.instructor.findMany({
				include: {
					coursesTeaching: true,
				},
			});
		case "student":
			return await prisma.student.findMany({
				include: {
					coursesEnrolled: true,
					searches: true,
				},
			});
		case "searches":
			return await prisma.searches.findMany({
				include: {
					searchedBy: true,
				},
			});
		default:
			return await prisma.course.findFirst({
				include: {
					instructor: true,
					enrolled: true,
				},
			});
	}
};
