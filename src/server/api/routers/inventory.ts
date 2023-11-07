import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const zodInventory = z.object({
  id: z.string().optional(),
  bookId: z.string(),
  status: z.number(),
  format: z.number(),
  condition: z.number(),
  bookOwner: z.string(),
  tagId: z.string().optional(),
  ownerNote: z.string().optional(),
  isDonated: z.boolean().optional(),
  dateAdded: z.date().optional(),
  lastUpdate: z.date().optional(),
});

export const inventoryRouter = createTRPCRouter({
  private: privateProcedure.query(() => {
    return {
      session: "Session",
    };
  }),
  getFullInventory: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.inventory.findMany({
      include: {
        book: { select: { id: true, title: true, language: true } },
      },
    });
  }),
  getByFilter: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(25).optional(),
        status: z.number().optional(),
        format: z.number().optional(),
        page: z.number(),
        search: z.string().optional(),
        language: z.number().optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { page, status, format, language } = input;
      const limit = input.limit ?? 25;
      const search = input.search ?? "";

      return ctx.prisma.inventory.findMany({
        take: limit,
        where: {
          status: status,
          format: format,
          book: {
            language: language,
            title: {
              contains: search,
            },
          },
        },
        skip: (page - 1) * limit,
      });
    }),
  getByBookId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.inventory.findMany({
      where: {
        bookId: input,
      },
    });
  }),
  count: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.inventory.count();
  }),
  add: publicProcedure
    .input(zodInventory.required())
    .mutation(async ({ ctx, input }) => {
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.inventory.create({
        data: input,
      });

      return post;
    }),
  update: publicProcedure
    .input(zodInventory)
    .mutation(async ({ ctx, input }) => {
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.prisma.inventory.update({
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
