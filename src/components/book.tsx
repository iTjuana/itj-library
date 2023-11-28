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
    <div className="flex flex-col items-center gap-2">
      <Link href={`/book/${book.isbn}`}>
        <Image
          src={book.image ?? "/cover-unavailable.jpg"}
          width={300}
          height={300}
          alt="cover"
        />
      </Link>

      <Link href={`/book/${book.isbn}`}>
        <p>{book.title ?? "Title is missing"}</p>
      </Link>

      <hr className="w-2/3" />
      <p className="text-[#556581]" title={book.authors ?? ""}>
        {book.authors ?? "Author(s) missing"}
      </p>
    </div>
  );
};
