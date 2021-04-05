/* eslint-disable @typescript-eslint/ban-ts-comment */

import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import withSession from "../../../util/session";
import prisma from "../../../util/prisma";
// @ts-ignore
import {Option} from "../../create/data/data";

const handler = nc<
	AuthorizedRequest,
	NextApiResponse
>().post(async (req, res) => {
    const data = req.body.data;

    const processFlags = () => {
        let str = "";
        data.Scheduled.map( (day:Option) => {str += day.value});
        return str;
    }
    
    const days = processFlags();
    
    const course = await prisma.course.create({
        data: {
            semester: data.Semester.value,
            name: data.CourseName,
            department: data.Department.value,
            capacity: parseInt(data.Capacity),
            description: data.Description,
            deadline: new Date().toISOString(),
            startTime: data.StartTime,
            endTime: data.EndTime,
            // @ts-ignore
            daysScheduled: days,
            instructor: {
                connect: {
                    id: req.body.userID
                }
            }
        }
    }).catch((e: Error) => {
        res.send(
           {Error: `${e.name}`}
        )
    })

    if(course) res.send({success: "Done!"});
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withSession(handler as any);
