import {
  GetServerSideProps,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "~/components/layout";

type Book = {
  isbns: string[];
  publishDates: string[];
  olids: string[];
  data: {
    title: string;
    subtitle: string;
    authors: [{ url: string; name: string }];
    number_of_pages: number;
    publishers: [{ name: string }];
    publish_places: [{ name: string }];
    subjects: [{ name: string; url: string }];
    cover: { small: string; medium: string; large: string };
  };
};

interface BooksProps {
  books: Book[];
}

interface BookProps {
  book: Book;
}
export const getServerSideProps: GetServerSideProps<{
  books: Book[];
}> = async () => {
  const isbns = ["6077476714", "6078589172", "6075507712", "6073828691", "0151010269"];
  const books = await Promise.all(isbns.map(async isbn => {
    const resp = await fetch(`http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`)
    const resJson = await resp.json()

    if (Array.isArray(resJson) && !resJson.length)
      return null

    const key = Object.keys(resJson.records)[0] || "";
    const book = resJson.records[key];
    return book;
  }));
  console.log(books)
  const resBook = await fetch(
    "http://openlibrary.org/api/volumes/brief/isbn/.json"
  );
  return { props: { books } };
};

const BookComponent:React.FunctionComponent<BookProps> = ({book}) => {
  if(!book){
    return <></>
  }
  return (
    <>
      <div>
        <p>{book.data.title}</p>
        <Image
          src={book.data.cover.large}
          width={500}
          height={500}
          alt="cover"
        />
      </div>
    </>
  ); 
}

const LogIn = ({ books }: BooksProps) => {
  return (
    <>
      <Head>
        <title>Testing cors</title>
        <meta name="description" content="Testing cors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-screen grid-cols-1 items-center gap-0 bg-white md:grid-cols-2">
        <Layout title="Inventory">
          <div>
            {books.map(book => <BookComponent book={book}></BookComponent>)}
          </div>
          
        </Layout>
      </main>
    </>
  );
};

export default LogIn;