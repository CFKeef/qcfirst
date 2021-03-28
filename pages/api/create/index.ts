import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import withSession from "../../../util/session";
import prisma from "../../../util/prisma";
const handler = nc<
	AuthorizedRequest,
	NextApiResponse
>().post(async (req, res) => {
    const data = req.body.data;

    const course = await prisma.course.create({
        data: {
            semester: data.Semester.value,
            name: data.CourseName,
            department: data.Department.value,
            capacity: parseInt(data.Capacity),
            description: data.Description,
            deadline: new Date().toISOString(),
            instructor: {
                connect: {
                    id: req.body.userID
                }
            }
        }
    }).catch((e: Error) => {
        res.status(500).send(
            e.name + ": Issue with Class creation"
        )
    }).finally(() => prisma.$disconnect)

    if(course) res.status(200).send("Done!");
});

export default withSession(handler as any);
