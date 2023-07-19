import { mergeRouters } from "../trpc";
import { booksRouter } from "./books";

const appRouter = mergeRouters(booksRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
