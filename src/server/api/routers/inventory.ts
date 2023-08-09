import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type Inventary, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getFullInventory(): Promise<Inventary[] | undefined> {
  try {
    return await prisma.inventary.findMany();
  } catch (error) {
    console.error("Error findMany inventory", error);
  }
}

export const inventoryRouter = createTRPCRouter({
  hello: publicProcedure
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
  private: privateProcedure.query(() => {
    return {
      session: "Session",
    };
  }),
  inventory: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(25).optional(),
        availability: z.number().optional(),
        format: z.number().optional(),
        language: z.number().optional(),
        page: z.number(),
      })
    )
    .query((opts) => {
      const { input } = opts;
      const { page, availability, format } = input;
      const limit = input.limit ?? 25;
      console.log(input);
      return prisma.inventary.findMany({
        take: limit,
        where: {
          status: availability?.toString(),
          format: format?.toString(), // TODO: need to change to number
        },
        skip: (page - 1) * limit,
      });
    }),
  count: publicProcedure.query(() => {
    return prisma.inventary.count();
  }),
});

// export type definition of API
export type InventoryRouter = typeof inventoryRouter;
