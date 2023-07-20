import * as trpcNext from "@trpc/server/adapters/next";
import { booksRouter } from "~/server/routers/books";

export default trpcNext.createNextApiHandler({
  router: booksRouter,
  createContext: () => ({}),
});
