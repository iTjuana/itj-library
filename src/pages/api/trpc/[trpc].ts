import * as trpcNext from "@trpc/server/adapters/next";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ error, type, path, input }) => {
          const data = {
            'environment':'dev',
            'path' : path,
            'input': input,
            'type' : type,
            'error_code': error.code,
            'error_msg': error.message,
            }
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );  
          return data
        }
      : undefined,
});
