import { booksRouter } from "./books";
import { mergeRouters } from  "../trpc";

const appRouter = mergeRouters(booksRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
