/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { resolve } from "path";
import { default as StudioHandler } from "@prisma/studio-vercel";

// Forward the Request & Response objects to `StudioHandler`. You should configure YOUR `schemaPath` here.
export default StudioHandler({
	schemaPath: resolve(__dirname, "../../prisma/schema.prisma"),
});
