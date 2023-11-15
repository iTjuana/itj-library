import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userInput = z
  .object({
    name: z.string(),
    email: z.string(),
    image: z.string(),
  })
  .required();

export const usersRouter = createTRPCRouter({
  // Get all users
  getUsers: publicProcedure.query(async () => {
    // TODO: Change to privateProcedure
    return await prisma.user.findMany();
  }),

  // Get all users
  getUserCount: publicProcedure.query(async () => {
    // TODO: Change to privateProcedure
    return await prisma.user.count();
  }),

  // Add user
  addUser: publicProcedure // TODO: Change to privateProcedure?
    .input(userInput)
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.user.create({ data: input });
    }),

  // Get user by id
  findUserById: publicProcedure // TODO: Change to privateProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Get user by email
  findUserByEmail: publicProcedure // TODO: Change to privateProcedure
    .input(
      z
        .object({
          email: z.string(),
        })
        .required()
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),

  // Get user by email
  getUserTransactionsById: publicProcedure // TODO: Change to privateProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.transaction.findMany({
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

  // Update user
  updateUser: publicProcedure // TODO: Change to privateProcedure
    .input(
      z.object({
        id: z.string(),
        userInfo: userInput,
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.user.update({
        where: {
          id: input.id,
        },
        data: input.userInfo,
      });
    }),
  // Remove user
  removeUser: publicProcedure // TODO: Change to privateProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return await prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

export type UsersRouter = typeof usersRouter;
