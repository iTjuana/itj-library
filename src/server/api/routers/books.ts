import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookInput = z.object({
  idISBN: z.string().optional(),
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
  inventary: z.string().optional(),
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
    console.log( await prisma.book.findMany());     // TODO: Remove line
    return await prisma.book.findMany();
  }),

  // Find Book
  findBookById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query( async( opts ) => {
      // Logic to find book by id
      const { input } = opts;
      const findBook = await prisma.book.findUnique({
        where: {
          idISBN: input.id,
        }
      })
      console.log("yayyy");                         // TODO: Remove line
      console.log(findBook);                        // TODO: Remove line

    }),

  // Add Book
  addBook: publicProcedure // TODO: Change to privateProcedure?
  .input(bookInput)
  .mutation(async ( opts ) => {
    // Logic to add books
    const { input } = opts;
    console.log('Book added');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.log("Show Input");
    console.log(input);
    // return await prisma.book.create({ data: input});
  }),
  
  // TODO: Confirm if needed
  private: privateProcedure.query(() => {
    return {
      session: "Session",
    };
  }),

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
