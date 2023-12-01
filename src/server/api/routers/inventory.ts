import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
  adminProcedure,
} from "~/server/api/trpc";

const zodInventory = z.object({
  id: z.string().optional(),
  bookId: z.string().optional(),
  status: z.number().optional(),
  format: z.number().optional(),
  condition: z.number().optional(),
  bookOwner: z.string().optional(),
  tagId: z.string().optional(),
  ownerNote: z.string().optional(),
  isDonated: z.boolean().optional(),
  dateAdded: z.date().optional(),
});

export const inventoryRouter = createTRPCRouter({
  getFullInventory: publicProcedure.query(({ ctx }) => {
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

  add: adminProcedure
    .input(zodInventory.required())
    .mutation(({ ctx, input }) => {
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return ctx.prisma.inventory.create({
        data: input,
      });
    }),

  update: adminProcedure.input(zodInventory).mutation(({ ctx, input }) => {
    // const { success } = await ratelimit.limit(authorId);
    // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

    return ctx.prisma.inventory.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  }),

  updateStatus: privateProcedure
    .input(zodInventory)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.inventory.update({
        where: {
          id: input.id,
        },
        data: { status: input.status },
      });
    }),
});

// export type definition of API
export type InventoryRouter = typeof inventoryRouter;
