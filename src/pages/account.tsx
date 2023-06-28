import { Button } from "~/components/button";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

type User = { name: string; company: string; email: string; phone: string };
type BookActivity = {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  action: string;
};

const Manage = () => {
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

  return (
    <>
      <main className="flex h-full flex-col items-center gap-4 bg-[#F7F8FC] pb-2 pt-5">
        <h1 className="text-4xl font-medium text-[#1C325F]">My Account</h1>
        <div className="flex flex-col gap-4 rounded bg-white p-4 text-lg font-medium text-[#323232] sm:w-1/3">
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
          <Button
            icon={faPenToSquare}
            onClick={() =>
              console.log("This should open a modal to change user info")
            }
          >
            Edit general information
          </Button>
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

export default Manage;
