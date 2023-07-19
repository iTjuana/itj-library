import { z } from "zod";
import { procedure, router } from "../trpc";
import { type Inventary, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  authors: z.string(),
  language: z.string(),
});

export const booksRouter = router({
  // Get Books
  getBooks: procedure
    .input(bookSchema)
    .query(({ ctx }) => {
      // Logic to retrieve books - [Q] how to connect to db?
      return ctx.prisma.Inventary.findMany();
    }),
  
  // Add Books
  addBook: procedure
    .input(bookSchema)
    .mutation(({ input, ctx }) =>{
      
      // Logic to add books
    }),
  
  // findBookById
  // updateBook
  // removeBook
});

// export type definition of API
export type booksRouter = typeof booksRouter;
