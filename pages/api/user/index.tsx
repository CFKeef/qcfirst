import { query as q } from "faunadb";
import { faunaClient, FAUNA_SECRET_COOKIE } from "../../../util/fauna-auth";
import cookie from "cookie";
import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest } from "../../../types/util";

export const fetchProfileID = async (faunaSecret: string) => {
	const ref = await faunaClient(faunaSecret).query(q.Identity());
	return ref.id;
};

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const cookies = cookie.parse(req.headers.cookie ?? "");
		const secret = cookies[FAUNA_SECRET_COOKIE ? FAUNA_SECRET_COOKIE : ""];

		if (!secret) return res.status(400).send("Auth missing");

		res.status(200).json({ user: await fetchProfileID(secret) });
	}
);

export default handler;
