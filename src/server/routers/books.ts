import { z } from "zod";
import { procedure, router } from "../trpc";
// import { Context } from "../context";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const bookSchema = z.object({
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
  // inventary - TBC
});

export const booksRouter = router({
  // Get Books
  getBooks: procedure
    .input(bookSchema)
    .query(({ctx}) => {
      // Logic to retrieve books - [Q] how to connect to db?
      const books = ctx;
      console.log(books);
      
      return [{text: 'yay'}];
    }),
  
  // Add Books
  // addBook: procedure
  //   .input(bookSchema)
  //   .mutation(({ input, ctx }) =>{
      
  //     // Logic to add books
  //   }),
  
  // findBookById
  // updateBook
  // removeBook
});

// export type definition of API
export type booksRouter = typeof booksRouter;
