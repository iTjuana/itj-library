import { type GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "~/components/layout";

type Book = {
  isbns: string[];
  publishDates: string[];
  olids: string[];
  data: {
    title: string;
    subtitle: string;
    key: string;
    authors: [{ url: string; name: string }];
    number_of_pages: number;
    publishers: [{ name: string }];
    publish_places: [{ name: string }];
    subjects: [{ name: string; url: string }];
    cover: { small: string; medium: string; large: string };
  };
};

interface BookResponse {
  records: { key: Book };
}

interface BookProps {
  book: Book | null;
}

interface BooksProps {
  books: (Book | null)[];
}

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
      const res: BookResponse = await (
        await fetch(
          `http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`
        )
      ).json();

      if (Array.isArray(res) && !res.length) return null;

      const key: string = Object.keys(res.records)[0] || "";

      // Got lint fix from: https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
      return res.records[key as keyof typeof res.records];
    })
  );
  return { props: { books } };
};

const BookComponent: React.FunctionComponent<BookProps> = ({ book }) => {
  if (!book) {
    return <></>;
  }
  return (
    <Link
      href={book.data.key}
      className="flex w-1/2 flex-col items-center sm:w-1/5"
    >
      <Image
        src={book.data.cover?.large ?? "/cover-unavailable.jpg"}
        width={300}
        height={300}
        alt="cover"
      />
      <p>{book.data.title}</p>
      <hr className="w-2/3" />
      <p className="text-[#556581]">{book.data.authors[0].name}</p>
    </Link>
  );
};

const Inventory = ({ books }: BooksProps) => {
  return (
    <>
      <Head>
        <title>Testing cors</title>
        <meta name="description" content="Testing cors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Inventory">
        <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
          <h1 className="text-4xl font-medium text-[#1C325F]">Catalog</h1>
          <div className="flex flex-wrap justify-center gap-3 sm:w-5/6">
            {books.map((book) => (
              <BookComponent book={book} key={book?.data.key}></BookComponent>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Inventory;
