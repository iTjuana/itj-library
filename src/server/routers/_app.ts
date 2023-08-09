import { booksRouter } from "./books";
import { router } from  "../trpc";

const appRouter = router({
    books: booksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
