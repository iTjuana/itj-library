import Image from "next/image";
import Link from "next/link";
import { type Book } from "@prisma/client";

export type BookApi = {
  publishDates: string[];
  title: string;
  key: string;
  authors: [{ url: string; name: string }];
  number_of_pages: number;
  publishers: [{ name: string }];
  publish_places: [{ name: string }];
  subjects: [{ name: string; url: string }];
  cover: { small: string; medium: string; large: string };
};

export type BookApiIsbn = {
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

export interface BookResponse {
  isbn: { book: BookApi };
}

export interface BookProps {
  book: Book | null;
}

export interface BooksProps {
  books: (BookApi | null)[];
}

export const SimpleBook: React.FunctionComponent<BookProps> = ({ book }) => {
  if (!book) {
    return <></>;
  }
  return (
    <Link
      href={`/book/${book.idISBN}`}
      className="flex w-1/2 flex-col items-center sm:w-1/5"
    >
      <Image
        src={book.image ?? "/cover-unavailable.jpg"}
        width={300}
        height={300}
        alt="cover"
      />
      <p>{book.title ?? "Title is missing"}</p>
      <hr className="w-2/3" />
      <p className="text-[#556581]" title={book.authors ?? ""}>
        {book.authors ?? "Author(s) missing"}
      </p>
    </Link>
  );
};
