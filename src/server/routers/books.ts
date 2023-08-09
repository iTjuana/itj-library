import { z } from "zod";
import { procedure, router } from "../trpc";

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
    .input(bookSchema)
    .query(async ({ctx}) => {
      // Logic to retrieve books
      return await ctx.prisma.book.findMany();
    }),
  
  // Add Books
  addBook: procedure
    .input(bookSchema)
    .mutation(async ({ input, ctx }) =>{
      // Logic to add books
      return await ctx.prisma.book.create({data: input});
    }),

  // Find Book
  findBookById: procedure
    .input(bookSchema)
    .query(),

  // Update Book
  updateBook: procedure
    .input(bookSchema),
    .mutation(),
  
  // Remove Book
  removeBook: procedure
    .input(bookSchema),
    .mutation(),


  // End router
  });
  

// export type definition of API
export type booksRouter = typeof booksRouter;
