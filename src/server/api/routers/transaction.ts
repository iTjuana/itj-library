import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const createTransactionInput = z.object({
  id: z.string().optional(),
  userId: z.string(),
  inventoryId: z.string(),
  status: z.number(),
  borrowDate: z.date().optional(),
  dueDate: z.date().optional(),
  returnDate: z.date().optional(),
  reviewDate: z.date().optional(),
});

const updateTransactionInput = z.object({
  id: z.string(),
  status: z.number().optional(),
  borrowDate: z.date().optional(),
  dueDate: z.date().optional(),
  returnDate: z.date().optional(),
  reviewDate: z.date().optional(),
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
        status: z.number().optional(),
        borrowDate: z.date().optional(),
        dueDate: z.date().optional(),
        returnDate: z.date().optional(),
        reviewDate: z.date().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const {
        userId,
        inventoryId,
        status,
        borrowDate,
        dueDate,
        returnDate,
        reviewDate,
      } = input;

      return ctx.prisma.transaction.findMany({
        where: {
          OR: [
            { userId: userId },
            { inventoryId: inventoryId },
            { status: status },
            { borrowDate: borrowDate },
            { dueDate: dueDate },
            { returnDate: returnDate },
            { reviewDate: reviewDate },
          ],
        },
        include: {
          inventory: {
            select: {
              tagId: true,
              book: {
                select: {
                  title: true,
                  isbn: true,
                },
              },
            },
          },
          user: {
            select: {
              name: true,
            },
          },
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
    .input(createTransactionInput)
    .mutation(async ({ ctx, input }) => {
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.transaction.create({
        data: input,
      });

      return post;
    }),
  update: publicProcedure
    .input(updateTransactionInput)
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
