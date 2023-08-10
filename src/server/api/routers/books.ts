import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookInput = z.object({
  idISBN: z.string(),
  isbn: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  language: z.string(),
  authors: z.string(),
  subjects: z.string(),
  publishDates: z.string(),
  publishers: z.string(),
  number_of_pages: z.string(),
  image: z.string(),
});

async function getBooksTable(): Promise<Book[] | undefined> {
  try {
    return await prisma.book.findMany();
  } catch (error) {
    console.error("Error findMany books", error);
  }
}

export const booksRouter = createTRPCRouter({
  // Get all books
  getBooks: publicProcedure
  .query(async () => {
    return await prisma.book.findMany();
  }),

  // Add Books
  addBook: publicProcedure // TODO: Change to privateProcedure?
  .input(bookInput)
  .mutation(async ({ input, ctx }) =>{
    // Logic to add books
    return await ctx.prisma.book.create({data: input});
  }),
  
  // TODO: Confirm if needed
  private: privateProcedure.query(() => {
    return {
      session: "Session",
    };
  }),

  // Find Book
  // findBookById: publicProcedure
  //   .input(bookInput)
  //   .query(),

  // Update Book
  // updateBook: publicProcedure // TODO: Change to privateProcedure
  //   .input(bookInput),
  //   .mutation(),
  
  // Remove Book
  // removeBook: publicProcedure // TODO: Change to privateProcedure
  //   .input(bookInput),
  //   .mutation(),


  // End router
  });
  

// export type definition of API
export type BooksRouter = typeof booksRouter;
