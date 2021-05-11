/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { join, resolve } from "path";
import { default as StudioHandler } from "@prisma/studio-vercel";

// Only needed for this example. This allows `@vercel/nft` to determine that this file is in use (and so does not need to be pruned).
// If you use Postgres / MySQL, you will instead use a connection string, and will not have a DB file, and so this can be removed.
join(process.cwd(), "prisma/dev.db");

// Forward the Request & Response objects to `StudioHandler`. You should configure YOUR `schemaPath` here.
export default StudioHandler({
	schemaPath: resolve(__dirname, "../../prisma/schema.prisma"),
});
