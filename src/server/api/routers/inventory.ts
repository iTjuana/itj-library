import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const zodInventory = z.object({
  id: z.string().optional(),
  status: z.number(),
  format: z.number(),
  condition: z.number(),
  bookOwner: z.string(),
  dateAdded: z.date().optional(),
  lastUpdate: z.date().optional(),
  bookId: z.string(),
});

export const inventoryRouter = createTRPCRouter({
  private: privateProcedure.query(() => {
    return {
      session: "Session",
    };
  }),
  getByFilter: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(25).optional(),
        availability: z.number().optional(),
        format: z.number().optional(),
        language: z.number().optional(),
        page: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      const { page, availability, format } = input;
      const limit = input.limit ?? 25;
      console.log(input);
      return ctx.prisma.inventary.findMany({
        take: limit,
        where: {
          status: availability,
          format: format,
        },
        skip: (page - 1) * limit,
      });
    }),
  getByBookId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.inventary.findMany({
      where: {
        bookId: input,
      },
    });
  }),
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.inventary.count();
  }),
  add: publicProcedure
    .input(zodInventory.required())
    .mutation(async ({ ctx, input }) => {
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.inventary.create({
        data: input,
      });

      return post;
    }),
  update: publicProcedure
    .input(zodInventory)
    .mutation(async ({ ctx, input }) => {
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.inventary.update({
        where: {
          id: input.id,
        },
        data: input,
      });

      return post;
    }),
});

// export type definition of API
export type InventoryRouter = typeof inventoryRouter;
