import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Transaction } from "@prisma/client";
import { getEnumKey, Status, TransactionStatus } from "utils/enum";

interface ToBorrowProps {
  transactions:
    | (Transaction & {
        user: {
          name: string;
        };
        inventory: {
          book: {
            title: string;
            isbn: string;
          };
          tagId: string | null;
        };
      })[]
    | undefined;
}

export const ToBorrowTable: React.FunctionComponent<ToBorrowProps> = ({
  transactions,
}) => {
  return (
    <>
      {transactions && transactions.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Borrowed Date</TableCell>
                <TableCell align="right">Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {transaction.inventory.book.title}
                  </TableCell>
                  <TableCell>{transaction.user.name}</TableCell>
                  <TableCell align="right">
                    {transaction.borrowDate?.toLocaleDateString() ?? "-"}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.dueDate?.toLocaleDateString() ?? "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
