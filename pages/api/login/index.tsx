import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest, LoginRes } from "../../../types/util";

const handler = nc<
	AuthorizedRequest,
	NextApiResponse
>().post(async (req, res) => {});

export default handler;
