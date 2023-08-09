import { prisma } from "~/server/db";
import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";

export function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;

  return {
    req,
    res,
    prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;