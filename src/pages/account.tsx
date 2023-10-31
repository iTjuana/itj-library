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

  console.log("session:", session);
  console.log("status:", status);

  if (session) {
    return (
      <div className="flex flex-col gap-4 rounded p-4 font-medium">
        Signed in as {session.user.email} <br />
        <button onClick={() => void signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 rounded p-4 font-medium">
      Not signed in <br />
      <button onClick={() => void signIn()}>Log in</button>
    </div>
  );
};

const Account = () => {
  const user: User = {
    name: "John Doe",
    company: "Dexcom",
    email: "email@host.com",
    phone: "+52 6641234567",
  };

  const rows = [
    {
      id: "001",
      title: "book",
      dueDate: "7 June 2023",
      status: "Borrowed",
      action: "Return",
    },
    {
      id: "001",
      title: "book",
      dueDate: "7 June 2023",
      status: "Returned",
      action: "See Book",
    },
    {
      id: "001",
      title: "book",
      dueDate: "7 June 2023",
      status: "Borrowed",
      action: "Return",
    },
    {
      id: "001",
      title: "book",
      dueDate: "7 June 2023",
      status: "Borrowed",
      action: "Return",
    },
    {
      id: "001",
      title: "book",
      dueDate: "7 June 2023",
      status: "Borrowed",
      action: "Return",
    },
    {
      id: "001",
      title: "book",
      dueDate: "7 June 2023",
      status: "Borrowed",
      action: "Return",
    },
  ] as BookActivity[];

  const [open, setOpen] = useState(false);

  console.log("user:", user);

  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">My Account</h1>
        <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
          <SessionComponent />
          <h3 className="text-xl font-semibold">General Information</h3>
          <section className="flex flex-col gap-2">
            <div className="flex gap-2.5">
              <p className="font-medium">Full name:</p>
              <p className="font-light">{user.name}</p>
            </div>
            <div className="flex gap-2.5">
              <p className="font-medium">Company:</p>
              <p className="font-light">{user.company}</p>
            </div>
          </section>
          <hr />
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <section className="flex flex-col gap-1">
            <div className="flex gap-2.5">
              <p className="font-medium">Email:</p>
              <p className="font-light">{user.email}</p>
            </div>
            <div className="flex gap-2.5">
              <p className="font-medium">Phone number:</p>
              <p className="font-light">{user.phone}</p>
            </div>
          </section>
          <Button variant="text" onClick={() => setOpen(true)}>
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
          </Modal>
        </div>
        <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] md:w-3/5">
          <h3 className="text-xl font-semibold">Activity</h3>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Due Date</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.dueDate}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
    </>
  );
};

export default Account;
