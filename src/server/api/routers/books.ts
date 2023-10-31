import { TRPCError } from '@trpc/server';
import { logger } from '../../../../utils/logger'
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const bookInput = z.object({
  isbn: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  language: z.number(),
  authors: z.string(),
  subjects: z.string(),
  publishDates: z.string(),
  publishers: z.string(),
  number_of_pages: z.number(),
  image: z.string(),
});

export const booksRouter = createTRPCRouter({
  // Get all books
  getBooks: publicProcedure.query(async ({ ctx }) => {
    try{
      // Logic to get all books
      logger.info('Gertting all books...',{'statusCode':ctx.res.statusCode, 'query': ctx.req.query})
      return await ctx.prisma.book.findMany();
    } catch(error){
      logger.error('There was an error getting books', error);
    }
  }), 

  // Find book by id
  findBookById: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .query(async ({ ctx, input }) => {
      // Logic to find book by id
      return await ctx.prisma.book.findUnique({
        where: {
          idISBN: input.id,
        },
      });
    }),

  // Get book info for book page by id
  getBookInfoById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      // Logic to find book by id
      return await ctx.prisma.book.findUnique({
        where: {
          idISBN: input,
        },
        include: {
          inventary: {
            select: {
              id: true,
              bookId: true,
              status: true,
              format: true,
              condition: true,
            },
          },
        },
      });
    }),

  // Get book info for book page by isbn
  getBookInfoByIsbn: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      // Logic to find book by id
      return await ctx.prisma.book.findFirst({
        where: {
          isbn: input,
        },
        include: {
          inventary: {
            select: {
              id: true,
              bookId: true,
              status: true,
              format: true,
              condition: true,
            },
          },
        },
      });
    }),

  // Find books by id
  findBooksById: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.book.findMany({
        where: {
          idISBN: { in: input },
        },
      });
    }),

  // Add Book
  addBook: publicProcedure // TODO: Change to privateProcedure?
    .input(bookInput.required())
    .mutation(async ({ ctx, input }) => {
      // Logic to add book
      return await ctx.prisma.book.create({ data: input });
    }),

  // Update Book
  updateBook: publicProcedure // TODO: Change to privateProcedure?
    .input(
      z
        .object({
          idISBN: z.string(),
          bookInfo: bookInput,
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      // Logic to update book
      return await ctx.prisma.book.update({
        where: {
          idISBN: input.idISBN,
        },
        data: input.bookInfo,
      });
    }),

  // Remove Book
  removeBook: publicProcedure // TODO: Change to privateProcedure?
    .input(
      z
        .object({
          idISBN: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      // Logic to remove book
      return await ctx.prisma.book.delete({
        where: {
          idISBN: input.idISBN,
        },
      });
    }),

  // TODO: Confirm if needed
  private: privateProcedure.query(() => {
    return {
      session: "Session",
    };
  }),

  // End router
});

// export type definition of API
export type BooksRouter = typeof booksRouter;
