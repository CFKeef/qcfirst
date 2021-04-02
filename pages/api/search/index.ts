import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import prisma from "../../../util/prisma";;
import withSession from "../../../util/session";
import { SearchForm } from "../../../components/search/form";
import { Option } from "../../../components/create/data/data";

interface SearchFormRequest extends SearchForm  {
    userID: number
}

const processScheduledString = (daysScheduled: Option[]) => {
    let str = "";
    daysScheduled.map((day:Option) => {
        str += day.value;
    })
    return str;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data: SearchFormRequest = req.body.data;

        // Need to find what fields to use in filter
        const result = await prisma.course.findMany({
            where: {
                semester: data.Semester.value,
                // name: data.CourseName.length > 0 ? data.CourseName : undefined ,
                // department: data.Department?.value,
                // status: data.status,
                // daysScheduled: {
                //     contains: 
                //}
            }, 
            include: {
                enrolled: true,
                instructor: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        console.log(result)
        if(result) res.status(200).send({courses: result});
        else res.status(500).send({"err": "Error with info provided"})
	}
);

export default withSession(handler as any);
