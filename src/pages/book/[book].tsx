import { type BookResponse, SimpleBook } from "~/components/book";
import { api } from "utils/trpc";
import { CircularProgress, Input, MenuItem, TextField } from "@mui/material";
import { type ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type Book, type Inventary } from "@prisma/client";
import Image from "next/image";

interface BookInfoPageProps {
  bookInfo: Book;
  inventory: Inventary[];
}

const BookInfoPage = ({ bookInfo, inventory }: BookInfoPageProps) => {
  console.log("bookInfo @ BookInfoPage", bookInfo);
  console.log("inventory @ BookInfoPage", inventory);
  return (
    <div className="flex flex-col items-center gap-5 mx-10">
      <div className="flex items-center justify-content-center gap-3 mx-auto">
        <aside>
          <Image
            src={bookInfo.image ?? "/cover-unavailable.jpg"}
            width={300}
            height={300}
            alt="cover"
          />
        </aside>
        <div className="items-center">
          <h1 className="text-4xl font-medium text-[#1C325F]">
            {bookInfo.title}
          </h1>
          <p className="text-gray-500">{bookInfo.authors}</p>
          <p className="text-gray-500 my-3">{bookInfo.publishDates}</p>
          <h1 className="text-xl font-medium text-[#1C325F]">
            {bookInfo.description}
          </h1>
            
            <div className="w-1/2 text-justify my-3">
              <p>{bookInfo.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta animi iusto quod error quas corrupti. Aliquam laborum ut nobis pariatur debitis in, voluptatum, provident impedit porro architecto recusandae quae odio!</p>
            </div>
        </div>
      </div>
        <div>
        {inventory.map((book) => {
          return (
            <>
            <table className="table-fixed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Format</th>
                  <th>Condition</th>
                  <th>Borrow</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{book.bookId}</td>
                  <td>{book.status}</td>
                  <td>{book.format}</td>
                  <td>{book.condition}</td>
                </tr>
              </tbody>
            </table>
              {/* <p className="text-2xl font-medium text-[#1C325F]">
                {book.status}
              </p>
              <p className="text-xl font-medium text-[#1C325F]">
                {book.format}
              </p> */}
            </>
          );
        })}
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
  const bookId = router.query.book as string;

  const inventory = api.inventory.getByBookId.useQuery(bookId);
  const bookInfo = api.books.findBookById.useQuery({
    id: bookId,
  });

  return (
    <>
      <main className="flex items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <div className="flex flex-col items-center gap-5">
          {!bookInfo.isFetched || !inventory.isFetched ? (
            <CircularProgress />
          ) : !bookInfo.data ? (
            <BlankBookPage />
          ) : (
            <BookInfoPage
              bookInfo={bookInfo.data}
              inventory={inventory.data ?? []}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default BookPage;