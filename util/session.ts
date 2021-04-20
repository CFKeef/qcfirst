import { Handler, withIronSession } from "next-iron-session";

const withSession = (handler: Handler) => {
	return withIronSession(handler, {
		password: process.env.FAUNA_DB_KEY as string,
		cookieName: "Coursor Session",
		cookieOptions: {
			secure: process.env.NODE_ENV === "production",
		},
	});
};

export default withSession;
