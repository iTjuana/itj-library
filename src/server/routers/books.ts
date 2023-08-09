import { z } from "zod";
import { procedure, router } from "../trpc";
import { resolve } from "path";

const testSchema = z.object({ res: z.string()});
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
    .input(testSchema)
    .query(async ({ctx}) => {
      // Logic to retrieve books
      return await ctx.prisma.book.findMany();
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
