import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type Book } from "@prisma/client";
import Image from "next/image";
import { api } from "utils/trpc";

interface BookInfoPageProps {
  book:
    | (Book & {
        inventary: {
          id: string;
          bookId: string;
          status: number;
          format: number;
          condition: number;
        }[];
      })
    | null
    | undefined;
}

const BookInfoPage = ({ book }: BookInfoPageProps) => {
  console.log("book @ BookInfoPage", book);

  return (
    <div className="flex flex-col items-center gap-14">
      <div className="flex items-center justify-center gap-16">
        <aside>
          <Image
            src={book?.image ?? "/cover-unavailable.jpg"}
            width={300}
            height={300}
            alt="cover"
          />
        </aside>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-medium text-[#1C325F]">{book?.title}</h1>
          <p className="text-gray-500">{book?.authors}</p>
          <p className="my-3 text-gray-500">{book?.publishDates}</p>
          <h1 className="text-xl font-medium text-[#1C325F]">
            {book?.description}
          </h1>

          <div className="my-3 text-justify">
            <p>
              {book?.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dicta animi iusto quod error quas corrupti.
              Aliquam laborum ut nobis pariatur debitis in, voluptatum,
              provident impedit porro architecto recusandae quae odio!
            </p>
          </div>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Format</TableCell>
                <TableCell align="right">Condition</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {book?.inventary.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.format}</TableCell>
                  <TableCell align="right">{row.condition}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <p className="text-2xl font-medium text-[#1C325F]">
                {book.status}
              </p>
              <p className="text-xl font-medium text-[#1C325F]">
                {book.format}
              </p> */}
      </div>
    </div>
  );
};

const BlankBookPage = () => {
  return (
    <>
      <h1 className="text-4xl font-medium text-[#1C325F]">
        Sorry, we don't have that book :/
      </h1>
    </>
  );
};

const BookPage = () => {
  const router = useRouter();
  const bookIsbn = router.query.book as string;

  const book = api.books.getBookInfoByIsbn.useQuery(bookIsbn);

  return (
    <>
      <main className="flex h-full justify-center bg-[#F7F8FC] pb-2 pt-8">
        {!book.isFetched ? (
          <CircularProgress />
        ) : !book.data ? (
          <BlankBookPage />
        ) : (
          <BookInfoPage book={book.data} />
        )}
      </main>
    </>
  );
};

export default BookPage;
