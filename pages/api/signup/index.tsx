import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthorizedRequest, LoginRes, SignUpRes } from "../../../types/util";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const { email, pass } = req.body.data;

		// Hash Pw

		// Save to db

		// send off JWT on success
	}
);

export default handler;
