import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthorizedRequest, LoginRes, SignUpRes } from "../../../types/util";

const handler = nc<
	AuthorizedRequest,
	NextApiResponse
>().post(async (req, res) => {});

export default handler;
