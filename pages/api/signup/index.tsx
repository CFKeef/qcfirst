import { query as q } from "faunadb";
import { serverClient, serializeFaunaCookie } from "../../../util/fauna-auth";
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthorizedRequest, LoginRes, SignUpRes } from "../../../types/util";

const handler = nc<AuthorizedRequest, NextApiResponse>().post(
	async (req, res) => {
		const data = await req.body;
		const email = data.Email;
		const password = data.Password;

		try {
			if (!email || !password)
				throw new Error("email and password must be provided.");

			let user: SignUpRes;
			// Try creating a new user
			try {
				user = await serverClient.query(
					q.Create(q.Collection("User"), {
						credentials: { password },
						data: {
							email: email,
							firstName: data.firstName,
							lastName: data.lastName,
							role: data.userType,
							authenticated: false,
						},
					})
				);
			} catch (err) {
				console.error("Fauna create user error:", err);
				throw new Error("User already exists.");
			}

			// Wasn't created
			if (!user.ref) {
				throw new Error("No ref present in create query response.");
			}

			// Set up session
			const loginRes: LoginRes = await serverClient.query(
				q.Login(q.Match(q.Index("users_by_email"), email), {
					password,
				})
			);

			if (!loginRes.secret) {
				throw new Error("No secret present in login query response.");
			}

			// Create the cookie we'll use in session
			const cookieSerialized = serializeFaunaCookie(loginRes.secret);

			res.setHeader("Set-Cookie", cookieSerialized);
			res.status(200).end();
		} catch (err) {
			res.status(400).send(err.message);
		}
	}
);

export default handler;
