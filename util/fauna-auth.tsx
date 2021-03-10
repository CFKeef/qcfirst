import faunadb from "faunadb";
let cookie = require("cookie");

export const FAUNA_SECRET_COOKIE = process.env.FAUNADB_SECRET_COOKIE;

export const serverClient = new faunadb.Client({
	secret: process.env.FAUNA_DB_KEY as string,
});

export const faunaClient = (secret: string) => {
	return new faunadb.Client({
		secret,
	});
};

export const serializeFaunaCookie = (userSecret: string) => {
	const cookieSerialized = cookie.serialize(FAUNA_SECRET_COOKIE, userSecret, {
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 72576000,
		httpOnly: true,
		path: "/",
	});

	return cookieSerialized;
};
