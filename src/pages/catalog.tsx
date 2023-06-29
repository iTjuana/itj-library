import { type BookResponse, SimpleBook, type Book } from "~/components/book";
import { trpc } from "utils/trpc";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const isObjectEmpty = (object: object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

interface BookDB {
  id: string;
  isbn: string;
  status: string;
  format: string;
  condition: string;
  bookOwner: string;
  dateAdded: Date;
  lastUpdate: Date;
  transaction: unknown;
}

const Catalog = () => {
  const inventory = trpc.inventory.useQuery();
  const [books, setBooks] = useState<(Book | null)[] | null>(null);

  useEffect(() => {
    const fetchBooks = async (books: BookDB[]) => {
      const values: ({ book: Book } | null)[] = await Promise.all(
        books.map(async (book: BookDB) => {
          const res = (await (
            await fetch(
              `https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&jscmd=data&format=json`
            )
          ).json()) as BookResponse;

          if (isObjectEmpty(res) || (Array.isArray(res) && !res.length))
            return null;

          const key: string = Object.keys(res)[0] || "";

          // Got lint fix from: https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
          return res[key as keyof typeof res];
        })
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setBooks(values);
    };

    if (inventory.isSuccess && !books)
      fetchBooks(inventory.data as unknown as BookDB[]).catch(() =>
        console.log("error when fetching books")
      );
  }, [inventory]);

  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Catalog</h1>
        <div className="flex flex-wrap justify-center gap-3 sm:w-5/6">
          {!inventory.isSuccess || !books ? (
            <CircularProgress />
          ) : !books.length ? (
            <p>No books right now :c</p>
          ) : (
            books?.map((book) => <SimpleBook book={book} key={book?.key} />)
          )}
        </div>
      </main>
    </>
  );
};

export default Catalog;
