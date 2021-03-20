import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest, LoginRes } from "../../../types/util";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const { user, pass } = req.body.data;

		// Hash pw

		// Compare pw in db to given

		// MAtch send JWT, fail send 401
	}
);

export default handler;
