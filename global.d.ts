import { PrismaClient } from "@prisma/client";
declare global {
    declare namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

export default global;