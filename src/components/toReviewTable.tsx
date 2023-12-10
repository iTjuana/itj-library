import {
  Button,
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
import { ReviewModal } from "./transactions";
import { useState } from "react";

interface ToReviewProps {
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

export const ToReviewTable: React.FunctionComponent<ToReviewProps> = ({
  transactions,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState(transactions);
  const [selectedTransaction, setSelectedTransaction] = useState<{
    id: string;
    inventoryId: string;
  } | null>(null);

  const handleOnReview = () => {
    setOpenModal(false);
    setBooks((prev) => {
      if (prev) {
        return prev.filter((book) => book.id !== selectedTransaction?.id);
      }
      return prev;
    });
  };

  return (
    <>
      {selectedTransaction && (
        <ReviewModal
          open={openModal}
          setOpen={setOpenModal}
          inventoryId={selectedTransaction.inventoryId}
          transactionId={selectedTransaction.id}
          onReview={handleOnReview}
        />
      )}

      {books && books.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Borrowed Date</TableCell>
                <TableCell align="right">Due Date</TableCell>
                <TableCell align="right">Return Date</TableCell>
                <TableCell align="right">Review Date</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {transaction.inventory.book.title}
                  </TableCell>
                  <TableCell align="right">{transaction.user.name}</TableCell>
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
                    <Button
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedTransaction({
                          id: transaction.id,
                          inventoryId: transaction.inventoryId,
                        });
                      }}
                    >
                      Review
                    </Button>
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
