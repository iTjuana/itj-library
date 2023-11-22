import { Status, TransactionStatus } from "utils/enum";
import { api } from "utils/trpc";
import { logger } from "utils/logger";
import { useEffect, useState } from "react";
import { any } from "zod";

type Response = {
  success: boolean | undefined;
  message: string | undefined;
};

const useBookAPI = () => {
  const [data, setData] = useState<Response>({
    success: undefined,
    message: undefined,
  });
  const bookInfo = api.books.getBookInfoByIsbn.useQuery("978-8420473352"); //978-8420473352
  console.log(bookInfo)
  setData({ success: true, message: "Data  added" });
  return;
};

export default useBookAPI;