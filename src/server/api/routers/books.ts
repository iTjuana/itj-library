import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { type Book, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookInput = z
  .object({
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
  })
  .required();

async function getBooksTable(): Promise<Book[] | undefined> {
  try {
    return await prisma.book.findMany();
  } catch (error) {
    console.error("Error findMany books", error);
  }
}

export const booksRouter = createTRPCRouter({
  // Get all books
  getBooks: publicProcedure.query(async () => {
    // Logic to get all books
    return await prisma.book.findMany();
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
    .query(async (opts) => {
      // Logic to find book by id
      const { input } = opts;
      return await prisma.book.findUnique({
        where: {
          idISBN: input.id,
        },
      });
    }),

  // Find books by id
  findBooksById: publicProcedure
    .input(z.array(z.string()))
    .query(async (opts) => {
      const { input } = opts;
      return await prisma.book.findMany({
        where: {
          idISBN: { in: input },
        },
      });
    }),

  // Add Book
  addBook: publicProcedure // TODO: Change to privateProcedure?
    .input(bookInput)
    .mutation(async (opts) => {
      // Logic to add book
      const { input } = opts;
      return await prisma.book.create({ data: input });
    }),

  // Update Book
  updateBook: publicProcedure // TODO: Change to privateProcedure?
    .input(
      z.object({
        idISBN: z.string(),
        bookInfo: bookInput,
      })
    )
    .mutation(async (opts) => {
      // Logic to update book
      const { input } = opts;
      return await prisma.book.update({
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
    .mutation(async (opts) => {
      // Logic to remove book
      const { input } = opts;
      return await prisma.book.delete({
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
