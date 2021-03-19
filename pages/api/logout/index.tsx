import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";

const handler = nc<
	AuthorizedRequest,
	NextApiResponse
>().post(async (req, res) => {});
