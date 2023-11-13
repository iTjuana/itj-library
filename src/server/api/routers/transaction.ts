import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const transactionInput = z.object({
  id: z.string().optional(),
  userId: z.string(),
  inventoryId: z.string(),
  action: z.number(),
  actionDate: z.date().optional(),
  dueDate: z.date().optional(),
});

export const transactionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany();
  }),
  getByFilter: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        inventoryId: z.string().optional(),
        action: z.number().optional(),
        actionDate: z.date().optional(),
        dueDate: z.date().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { userId, inventoryId, action, actionDate, dueDate } = input;

      return ctx.prisma.transaction.findMany({
        where: {
          OR: [
            { userId: userId },
            { inventoryId: inventoryId },
            { action: action },
            { actionDate: actionDate },
            { dueDate: dueDate },
          ],
        },
      });
    }),
  // TODO: determine if this is needed or to use getByFilter
  getByBookId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        inventoryId: input,
      },
    });
  }),
  // TODO: determine if this is needed or to use getByFilter
  getByUserId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: input,
      },
    });
  }),
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.inventory.count();
  }),
  add: publicProcedure
    .input(transactionInput)
    .mutation(async ({ ctx, input }) => {
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.transaction.create({
        data: input,
      });

      return post;
    }),
  update: publicProcedure
    .input(transactionInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.transaction.update({
        where: {
          id: id,
        },
        data: data,
      });

      return post;
    }),
});

export type TransactionRouter = typeof transactionRouter;
