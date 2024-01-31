import { Modal, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { TransactionStatus } from "utils/enum";
import { getUserId } from "utils/session";
import useTransaction from "~/hooks/useTransaction";

const style = {
  position: "absolute",
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

const ResponseModal = ({
  data,
}: {
  data: { success: boolean | undefined; message: string | undefined };
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Transaction
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Was successful? {data.success}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {data.message}
        </Typography>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Ok
        </Button>
      </Box>
    </Modal>
  );
};

export const Wishlist = ({
  inventoryId,
  userId,
  action,
}: {
  inventoryId: string;
  userId: string;
  action: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
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

export const BorrowBookModal = ({
  open,
  setOpen,
  onBorrow,
  inventoryId,
}: {
  inventoryId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onBorrow: () => void;
}) => {
  const defaultBorrowDays = 14;

  const userIdFromSession = getUserId();

  const { data, borrowBook } = useTransaction();

  return (
    <>
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
            <b>Due Date:</b> {getDatePlusDays(defaultBorrowDays).toDateString()}
          </Typography>
          <Button
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            onClick={() => {
              borrowBook({
                inventoryId,
                userId: userIdFromSession,
                daysBorrowed: defaultBorrowDays,
                onBorrow,
              });
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
      <ResponseModal data={data} />
    </>
  );
};

export const ReturnBookModal = ({
  open,
  setOpen,
  inventoryId,
  transactionId,
  onReturn,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  inventoryId: string;
  transactionId: string;
  onReturn: () => void;
}) => {
  const { data, setNextStatus } = useTransaction();

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Return Book
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Return Date:</b> {getDatePlusDays(0).toDateString()}
          </Typography>
          <Button
            onClick={() => {
              setNextStatus({
                inventoryId,
                transactionId,
                nextStatus: TransactionStatus.Returned,
                onSetStatus: onReturn,
              });
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
      <ResponseModal data={data} />
    </>
  );
};

export const ReviewModal = ({
  open,
  setOpen,
  inventoryId,
  transactionId,
  onReview,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  inventoryId: string;
  transactionId: string;
  onReview: () => void;
}) => {
  const { data, setNextStatus } = useTransaction();

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Review Book
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Review Date:</b> {getDatePlusDays(0).toDateString()}
          </Typography>
          <Button
            onClick={() => {
              setNextStatus({
                inventoryId,
                transactionId,
                nextStatus: TransactionStatus.Reviewed,
                onSetStatus: onReview,
              });
              setOpen(false);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
      <ResponseModal data={data} />
    </>
  );
};
