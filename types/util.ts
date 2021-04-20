import { NextApiRequest } from "next";
export interface AuthorizedRequest extends NextApiRequest {
	session: any;
}

export interface LoginRes extends Object {
	secret: any;
}

export interface SignUpRes extends Object {
	ref: any;
}

export type StudentSession = {
	email: string;
	firstName: string;
	id: number;
	isStudent: true;
	lastName: string;
};
