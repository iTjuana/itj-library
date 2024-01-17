import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { type Book } from "@prisma/client";
import { api } from "utils/trpc";
import { Status, Format, Condition, Language, getEnumKey } from "utils/enum";
import { BorrowBookModal } from "~/components/transactions";
import { useState } from "react";

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
  const [openModal, setOpenModal] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState<string>("");
  const [inventoryBooks, setInventoryBooks] = useState(inventory);

  const handleOnBorrowBook = () => {
    setOpenModal(false);
    setInventoryBooks(
      inventoryBooks?.map((book) => {
        if (book.id === selectedInventoryId) {
          return {
            ...book,
            status: Status.Borrowed,
          };
        }
        return book;
      })
    );
  };

  return (
    <>
      <BorrowBookModal
        inventoryId={selectedInventoryId}
        open={openModal}
        setOpen={setOpenModal}
        onBorrow={handleOnBorrowBook}
      />

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
            {inventoryBooks?.map((row) => (
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
                {row.status === Status.Available && (
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        setSelectedInventoryId(row.id);
                        setOpenModal(true);
                      }}
                    >
                      Borrow Book
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const BookInfoPage = ({ book }: BookInfoPageProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-14 sm:w-full md:w-3/4 lg:w-1/2">
      <div className="flex flex-col-reverse items-center justify-center gap-10 md:flex-row">
        <aside>
          <Image
            src={book?.image ?? "/cover-unavailable.jpg"}
            width={300}
            height={300}
            alt="cover"
          />
        </aside>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-medium">{book?.title}</h1>
          <p className="text-xl text-gray-500">{book?.authors}</p>
          <p className="my-3 text-gray-500">{book?.publishDates}</p>

          <div className="my-3 text-justify">
            <p>{book?.description}</p>
          </div>
          <p className="my-3 text-gray-500">
            {getEnumKey(Language, book?.language)}
          </p>
        </div>
      </div>
      <InventoryTable inventory={book?.inventory} />
    </div>
  );
};

const BlankBookPage = () => {
  return (
    <>
      <h1 className="text-4xl font-medium">
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
      <main className="w-100 flex h-full items-center justify-center bg-[#F7F8FC] px-10 pb-2 pt-8">
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
