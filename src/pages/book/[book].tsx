import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { type Book } from "@prisma/client";
import { api } from "utils/trpc";
import { Status, Format, Condition, Language, getEnumKey } from "utils/enum";
import { getUserId } from "utils/session";
import { useTransaction } from "~/hooks/useTransaction";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const getDatePlusDays = (days: number) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + days);
  return dueDate;
};

const Wishlist = ({
  inventoryId,
  userId,
  action,
}: {
  inventoryId: string;
  userId: string;
  action: number;
}) => {
  const [open, setOpen] = useState(false);
  const defaultBorrowDays = 14;

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add to Wishlist
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Wishlist
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Not yet implemented
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Exit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const Borrow = ({
  inventoryId,
  userId,
  action,
}: {
  inventoryId: string;
  userId: string;
  action: number;
}) => {
  const [open, setOpen] = useState(false);
  const defaultBorrowDays = 14;

  // check if we should do this in main component (see if userId would be visible on html props)
  const userIdFromSession = getUserId();

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Borrow
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Borrow Book
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Due Date: {getDatePlusDays(defaultBorrowDays).getDate()}
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              useTransaction(
                inventoryId,
                userIdFromSession,
                action,
                defaultBorrowDays
              );
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </>
  );
};

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
                  <Borrow inventoryId={row.id} userId={row.bookId} action={0} />
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
              {book?.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dicta animi iusto quod error quas corrupti.
              Aliquam laborum ut nobis pariatur debitis in, voluptatum,
              provident impedit porro architecto recusandae quae odio!
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
