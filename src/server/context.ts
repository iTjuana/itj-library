import { type inferAsyncReturnType } from "@trpc/server";
import { type NextApiRequest , type NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    return { req, res };
}

export type Context = inferAsyncReturnType<typeof createContext>;