import { useSession } from "next-auth/react";
import { api } from "utils/trpc";

export const getUserId = () => {
  const { data: session, status } = useSession();

  const user = api.users.getUserBySession.useQuery().data;

  return user?.id ?? "0";
};
