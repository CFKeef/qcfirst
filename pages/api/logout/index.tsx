import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import withSession from "../../../util/session";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		req.session.detroy();
		res.json({ isLoggedIn: false });
	}
);

export default withSession(handler as any);
