import { z } from "zod";
import { procedure, router } from "../trpc";
import { type Inventary, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getFullInventory(): Promise<Inventary[] | undefined> {
  try {
    return await prisma.inventary.findMany();
  } catch (error) {
    console.error("Error findMany inventory", error);
  }
}

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  inventory: procedure.query(async () => {
    return await getFullInventory();
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
