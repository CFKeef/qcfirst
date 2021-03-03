import { query as q } from "faunadb";
import { serverClient, serializeFaunaCookie } from "../../../util/fauna-auth";
import nc from "next-connect";
import { NextApiResponse } from "next";
import { AuthorizedRequest, LoginRes } from "../../../types/util";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = await req.body;
		const email = data.Email;
		const password = data.Password;

		try {
			if (!email || !password)
				throw new Error("email and password must be provided.");

			const loginRes: LoginRes = await serverClient.query(
				q.Login(q.Match(q.Index("users_by_email"), email), {
					password,
				})
			);

			if (!loginRes.secret) {
				throw new Error("No secret present in login query response.");
			}

			const cookieSerialized = serializeFaunaCookie(loginRes.secret);

			res.setHeader("Set-Cookie", cookieSerialized);
			res.status(200).end();
		} catch (err) {
			res.status(400).send(err.message);
		}
	}
);

export default handler;
