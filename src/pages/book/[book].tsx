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
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { type Book } from "@prisma/client";
import { api } from "utils/trpc";
import {
  Status,
  Format,
  Condition,
  Language,
  getEnumKey,
  TransactionStatus,
} from "utils/enum";
import { Borrow, Wishlist } from "~/components/transactions";

interface BookInfoPageProps {
  book:
    | (Book & {
        inventory: {
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

const InventoryTable = ({
  inventory,
}: {
  inventory:
    | {
        id: string;
        bookId: string;
        status: number;
        format: number;
        condition: number;
      }[]
    | undefined;
}) => {
  return (
    <TableContainer component={Paper} elevation={0}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                fontSize: "1rem",
              },
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Format</TableCell>
            <TableCell align="right">Condition</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory?.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                  color: "#556581",
                  fontSize: "1rem",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">
                {getEnumKey(Status, row.status)}
              </TableCell>
              <TableCell align="right">
                {getEnumKey(Format, row.format)}
              </TableCell>
              <TableCell align="right">
                {getEnumKey(Condition, row.condition)}
              </TableCell>
              <TableCell align="right">
                {row.status === Status.Available ? (
                  <Borrow inventoryId={row.id} userId={row.bookId} />
                ) : (
                  <Wishlist
                    inventoryId={row.id}
                    userId={row.bookId}
                    action={0}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BookInfoPage = ({ book }: BookInfoPageProps) => {
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
          <p className="text-xl text-gray-500">{book?.authors}</p>
          <p className="my-3 text-gray-500">{book?.publishDates}</p>

          <div className="my-3 text-justify">
            <p>
              {book?.description}
            </p>
          </div>
          <p className="my-3 text-gray-500">
            {getEnumKey(Language, book?.language)}
          </p>
        </div>
      </div>
      <div>
        <InventoryTable inventory={book?.inventory} />
      </div>
    </div>
  );
};

const BlankBookPage = () => {
  return (
    <>
      <h1 className="text-4xl font-medium text-[#1C325F]">
        Sorry, we don&apos;t have that book :/
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
        {book.isLoading ? (
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
