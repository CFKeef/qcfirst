import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";
import withSession from "../../../util/session";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		req.session.destroy();
		res.status(200).json({ Success: "See you next time!" });
	}
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withSession(handler as any);
