import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const userInput = z
  .object({
    name: z.string(),
    email: z.string(),
    image: z.string(),
  })
  .required();

export const usersRouter = createTRPCRouter({
  getUsers: adminProcedure.query(({ ctx, input }) => {
    return ctx.prisma.user.findMany();
  }),

  getUserCount: adminProcedure.query(({ ctx, input }) => {
    return ctx.prisma.user.count();
  }),

  addUser: adminProcedure.input(userInput).mutation(({ ctx, input }) => {
    return ctx.prisma.user.create({ data: input });
  }),

  findUserById: adminProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  findUserByEmail: adminProcedure
    .input(
      z
        .object({
          email: z.string(),
        })
        .required()
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),

  getUserTransactionsById: adminProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: {
          userId: input.id,
        },
        include: {
          inventory: {
            select: {
              status: true,
              book: {
                select: {
                  title: true,
                  isbn: true,
                },
              },
            },
          },
        },
      });
    }),

  getUserBySession: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
    });
  }),

  getTransactionsBySession: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      include: {
        inventory: {
          select: {
            status: true,
            book: {
              select: {
                title: true,
                isbn: true,
              },
            },
          },
        },
      },
    });
  }),

  updateUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
        userInfo: userInput,
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: input.userInfo,
      });
    }),

  removeUser: adminProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export type UsersRouter = typeof usersRouter;
