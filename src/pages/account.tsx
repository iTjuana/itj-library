import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  CircularProgress,
  Button,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { api } from "utils/trpc";
import { TransactionStatus, Status, getEnumKey } from "utils/enum";
import { ReturnBookModal } from "~/components/transactions";
import { useEffect, useState } from "react";

const Activity = () => {
  const transactions = api.users.getTransactionsBySession.useQuery();

  const [openModal, setOpenModal] = useState(false);
  const [userTransactions, setUserTransactions] = useState(transactions.data);
  const [selectedTransaction, setSelectedTransaction] = useState<{
    id: string;
    inventoryId: string;
  } | null>(null);

  const handleOnReturnBook = () => {
    setOpenModal(false);
    setUserTransactions(
      userTransactions?.map((transaction) => {
        if (transaction.id === selectedTransaction?.id) {
          return {
            ...transaction,
            inventory: {
              ...transaction.inventory,
              status: Status.In_review,
            },
            status: TransactionStatus.Returned,
          };
        }
        return transaction;
      })
    );
  };

  useEffect(() => {
    if (transactions.isSuccess) {
      setUserTransactions(transactions.data);
    }
  }, [transactions.isSuccess, transactions.data]);

  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-full md:w-3/5">
      <ReturnBookModal
        inventoryId={selectedTransaction?.inventoryId ?? ""}
        transactionId={selectedTransaction?.id ?? ""}
        open={openModal}
        setOpen={setOpenModal}
        onReturn={handleOnReturnBook}
      />

      <h3 className="text-xl font-semibold">Activity</h3>
      {transactions.isLoading ? (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      ) : userTransactions && userTransactions.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Borrowed Date</TableCell>
                <TableCell align="right">Due Date</TableCell>
                <TableCell align="right">Return Date</TableCell>
                <TableCell align="right">Review Date</TableCell>
                <TableCell align="right">Book Status</TableCell>
                <TableCell align="right">Borrow Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {transaction.inventory.book.title}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.borrowDate?.toLocaleDateString() ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.dueDate?.toLocaleDateString() ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.returnDate?.toLocaleDateString() ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.reviewDate?.toLocaleDateString() ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {getEnumKey(Status, transaction.inventory.status)}
                  </TableCell>
                  <TableCell align="right">
                    {getEnumKey(TransactionStatus, transaction.status)}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.status === TransactionStatus.Borrowed ? (
                      <Button
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedTransaction({
                            id: transaction.id,
                            inventoryId: transaction.inventoryId,
                          });
                        }}
                      >
                        Return Book
                      </Button>
                    ) : (
                      <Link href={`/book/${transaction.inventory.book.isbn}`}>
                        See Book
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="text-center">No activity</p>
      )}
    </div>
  );
};

const SessionComponent = () => {
  const { data: session, status } = useSession();

  const user = api.users.getUserBySession.useQuery();

  if (status === "loading") {
    return (
      <div className="flex justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (session) {
    return (
      <>
        <div
          className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-full md:w-3/5
        "
        >
          {user.isLoading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold">General Information</h3>
              <section className="flex flex-col gap-2">
                <div className="flex gap-2.5">
                  <p className="font-medium">Full name:</p>
                  <p className="font-light">{user.data?.name}</p>
                </div>
                {user.data?.email && (
                  <div className="flex gap-2.5">
                    <p className="font-medium">Company:</p>
                    <p className="font-light">
                      {user.data?.email.split("@")[1]}
                    </p>
                  </div>
                )}
              </section>
              <hr />
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <section className="flex flex-col gap-1">
                <div className="flex gap-2.5">
                  <p className="font-medium">Email:</p>
                  <p className="font-light">{user.data?.email}</p>
                </div>
              </section>
              <Button
              variant="contained"
              className="customButtonSignOut"
                onClick={() => void signOut()}
              >
                Sign out
              </Button>
            </>
          )}
        </div>
        <Activity />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-full md:w-3/5">
      Not signed in <br />
      <button onClick={() => void signIn("auth0")}>Log in</button>
    </div>
  );
};

const Account = () => {
  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] px-10 pb-2 pt-5">
        <h1 className="text-4xl font-medium">My Account</h1>
        <SessionComponent />
      </main>
    </>
  );
};

export default Account;
