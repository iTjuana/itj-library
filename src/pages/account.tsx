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
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { api } from "utils/trpc";
import { TransactionStatus, Status, getEnumKey } from "utils/enum";
import { Return } from "~/components/transactions";

const Activity = () => {
  const transactions = api.users.getTransactionsBySession.useQuery();

  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] md:w-3/5">
      <h3 className="text-xl font-semibold">Activity</h3>
      {transactions.isLoading ? (
        <CircularProgress />
      ) : (
        transactions.data &&
        transactions.data.length > 0 && (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Borrowed Date</TableCell>
                  <TableCell align="right">Due Date</TableCell>
                  <TableCell align="right">Return Date</TableCell>
                  <TableCell align="right">Review Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                  <TableCell align="right">-</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.data.map((transaction) => (
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
                        <Return
                          inventoryId={transaction.inventoryId}
                          transactionId={transaction.id}
                        />
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
        )
      )}
    </div>
  );
};

const SessionComponent = () => {
  const { data: session, status } = useSession();

  const user = api.users.getUserBySession.useQuery();

  if (session) {
    return (
      <>
        {user.isLoading ? (
          <CircularProgress />
        ) : (
          <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
            <h3 className="text-xl font-semibold">General Information</h3>

            <section className="flex flex-col gap-2">
              <div className="flex gap-2.5">
                <p className="font-medium">Full name:</p>
                <p className="font-light">{user.data?.name}</p>
              </div>
              {user.data?.email && (
                <div className="flex gap-2.5">
                  <p className="font-medium">Company:</p>
                  <p className="font-light">{user.data?.email.split("@")[1]}</p>
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
            <button onClick={() => void signOut()}>Sign out</button>
          </div>
        )}
        <Activity />
      </>
    );
  }
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
      Not signed in <br />
      <button onClick={() => void signIn()}>Log in</button>
    </div>
  );
};

const Account = () => {
  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">My Account</h1>
        <SessionComponent />
      </main>
    </>
  );
};

export default Account;
