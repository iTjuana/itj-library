import { createTRPCRouter } from "~/server/api/trpc";
import { inventoryRouter } from "./routers/inventory";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  inventory: inventoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
