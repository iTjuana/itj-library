import { PrismaClient } from "@prisma/client";
import { Context } from '@trpc/server';

export interface CustomContext extends Context{
    prisma: PrismaClient;
}

export function createContext() {
    const prisma = new PrismaClient();

    return {
        prisma,
    };
}