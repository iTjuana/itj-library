import Image from "next/image";
import Link from "next/link";

export type Book = {
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

export type BookISBN = {
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
  isbn: { book: Book };
}

export interface BookProps {
  book: Book | null;
}

export interface BooksProps {
  books: (Book | null)[];
}

export const SimpleBook: React.FunctionComponent<BookProps> = ({ book }) => {
  if (!book) {
    return <></>;
  }
  return (
    <Link href={book.key} className="flex w-1/2 flex-col items-center sm:w-1/5">
      <Image
        src={book.cover?.large ?? "/cover-unavailable.jpg"}
        width={300}
        height={300}
        alt="cover"
      />
      <p>{book.title}</p>
      <hr className="w-2/3" />
      <p className="text-[#556581]">{book.authors[0].name}</p>
    </Link>
  );
};
