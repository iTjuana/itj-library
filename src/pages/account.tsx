import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { api } from "utils/trpc";
import { Status } from "utils/enum";

type User = { name: string; company: string; email: string; phone: string };
type BookActivity = {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  action: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const SessionComponent = () => {
  const { data: session, status } = useSession();

  const user = api.users.findUserByEmail.useQuery({
    email: session?.user.email ?? "0",
  }).data;
  const transactions = api.users.getUserTransactionsById.useQuery({
    id: user?.id ?? "0",
  }).data;

  console.log("user db", user);
  console.log("transactions db", transactions);

  if (session) {
    return (
      <>
        <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
          <h3 className="text-xl font-semibold">General Information</h3>
          <section className="flex flex-col gap-2">
            <div className="flex gap-2.5">
              <p className="font-medium">Full name:</p>
              <p className="font-light">{session?.user.name}</p>
            </div>
            {session?.user.email && (
              <div className="flex gap-2.5">
                <p className="font-medium">Company:</p>
                <p className="font-light">{session.user.email.split("@")[1]}</p>
              </div>
            )}
          </section>
          <hr />
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <section className="flex flex-col gap-1">
            <div className="flex gap-2.5">
              <p className="font-medium">Email:</p>
              <p className="font-light">{session?.user.email}</p>
            </div>
            {/* {session?.user.number && ( // TODO: there is no phone number in the session
              <div className="flex gap-2.5">
                <p className="font-medium">Phone number:</p>
                <p className="font-light">{session.user.number}</p>
              </div>
            )} */}
          </section>
          {/* <Button variant="text" onClick={() => setOpen(true)}> // TODO: how would edit work if account is in another service?
          Edit general information
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              TODO:
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Add edit profile functionality
            </Typography>
          </Box>
        </Modal> */}
          <button onClick={() => void signOut()}>Sign out</button>
        </div>
        <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] md:w-3/5">
          <h3 className="text-xl font-semibold">Activity</h3>
          {transactions && transactions.length > 0 && (
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Borrowed Date</TableCell>
                    <TableCell align="right">Due Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {transaction.id}
                      </TableCell>
                      <TableCell align="right">
                        {transaction.inventary.book.title}
                      </TableCell>
                      <TableCell align="right">
                        {transaction.borrowedDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        {transaction.dueDate.toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        {transaction.inventary.status}
                      </TableCell>
                      <TableCell align="right">
                        {transaction.inventary.status === 2
                          ? "Return"
                          : "See Book"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
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
