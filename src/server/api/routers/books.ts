import { TRPCError } from "@trpc/server";
import { logger } from "utils/logger";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Prisma } from '@prisma/client';

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
  numberOfPages: z.number(),
  image: z.string(),
});

const bookInventory = z.object({
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

type responseStructure = {
  success: boolean,
  message: string,
}

export const booksRouter = createTRPCRouter({
  // Get all books
  getBooks: publicProcedure.query(({ ctx }) => {
    try {
      // Logic to get all books
      logger.info("Getting all books...", {
        statusCode: ctx.res.statusCode,
        query: ctx.req.query,
      });
      return ctx.prisma.book.findMany();
    } catch (error) {
      logger.error("There was an error getting books", error);
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
    .query(({ ctx, input }) => {
      // Logic to find book by id
      return ctx.prisma.book.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Get book info for book page by id
  getBookInfoById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    // Logic to find book by id
    return ctx.prisma.book.findUnique({
      where: {
        id: input,
      },
      include: {
        inventory: {
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
    .query(({ ctx, input }) => {
      // Logic to find book by id
      return ctx.prisma.book.findFirst({
        where: {
          isbn: input,
        },
        include: {
          inventory: {
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
    .query(({ ctx, input }) => {
      return ctx.prisma.book.findMany({
        where: {
          id: { in: input },
        },
      });
    }),

  // Logic to add book
  addBook: publicProcedure // TODO: Change to privateProcedure?
    .input(z.object({
      inventoryData: bookInventory,
      bookData: bookInput
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const exist = await ctx.prisma.book.findFirst({
          where:{
            isbn: input.bookData.isbn
          },
          select: {
            id: true
          },
        });

        // If exist then we need to add book on Inventory table only
        if (exist != null && exist.id != null){
          input.inventoryData.bookId = exist.id;
          const responseInventory = await ctx.prisma.inventory.create({
            data: input.inventoryData
          });
          console.log('Book exist, data added to Inventory');
          // console.log(responseInventory); // Enable for debug
        }
        else{  //  If does not exist then we need to add book in Books and Inventory tables
          const responseBook = await ctx.prisma.book.create({
            data : input.bookData
          });
          const bookID = responseBook.id;
          input.inventoryData.bookId = bookID;
          const responseInventory = await ctx.prisma.inventory.create({
            data: input.inventoryData
          });
          console.log('Book does not exist, data added to Inventory and Book');
          // console.log(responseBook); // Enable for debug
          // console.log(responseInventory); // Enable for debug
        }
        return<responseStructure>{
          success: true,
          message: `${input.bookData.title} added successfully`
        }
      } 
      catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError ||
            e instanceof Prisma.PrismaClientUnknownRequestError ||
            e instanceof Prisma.PrismaClientRustPanicError ||
            e instanceof Prisma.PrismaClientInitializationError ||
            e instanceof Prisma.PrismaClientUnknownRequestError) {
          logger.error("There was an error adding books", e);
          return<responseStructure>{
            success: false,
            message: `There was an error: ${e.message}`
          }
        }
        return<responseStructure>{
          success: false,
          message: `There was an error: ${e}`
        }
        throw e;
      }
    }),

  // Update Book
  updateBook: publicProcedure // TODO: Change to privateProcedure?
    .input(
      z
        .object({
          id: z.string(),
          bookInfo: bookInput,
        })
        .required()
    )
    .mutation(({ ctx, input }) => {
      // Logic to update book
      return ctx.prisma.book.update({
        where: {
          id: input.id,
        },
        data: input.bookInfo,
      });
    }),

  // Remove Book
  removeBook: publicProcedure // TODO: Change to privateProcedure?
    .input(
      z
        .object({
          id: z.string(),
        })
        .required()
    )
    .mutation(({ ctx, input }) => {
      // Logic to remove book
      return ctx.prisma.book.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

// export type definition of API
export type BooksRouter = typeof booksRouter;
