import { type GetServerSideProps } from "next";
import {
  type BookResponse,
  type BooksProps,
  SimpleBook,
} from "~/components/book";

const isObjectEmpty = (object: object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps<BooksProps> = async () => {
  // here you should get the books from the database
  // dummy catalog
  const isbns = [
    "8420473359",
    "4087603512",
    "9780982788097",
    "9781787533202",
    "613997026",
    "9788418933011",
    "2080701975",
    "9780719048746",
    "9780446405560",
    "2081427117",
    "9789123649709",
    "9100579319",
    "9789123649709",
    "9780156012072",
  ];

  const books = await Promise.all(
    isbns.map(async (isbn) => {
      const res = (await (
        await fetch(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
        )
      ).json()) as BookResponse;

      if (isObjectEmpty(res) || (Array.isArray(res) && !res.length))
        return null;

      const key: string = Object.keys(res)[0] || "";

      // Got lint fix from: https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
      return res[key as keyof typeof res];
    })
  );

  return { props: { books } };
};

const Catalog = ({ books }: BooksProps) => {
  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">Catalog</h1>
        <div className="flex flex-wrap justify-center gap-3 sm:w-5/6">
          {books.map((book) => (
            <SimpleBook book={book} key={book?.key} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Catalog;
