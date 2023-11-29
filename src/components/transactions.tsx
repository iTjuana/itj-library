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
  const defaultBorrowDays = 14;

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

export const Borrow = ({
  inventoryId,
  userId,
}: {
  inventoryId: string;
  userId: string;
}) => {
  const [open, setOpen] = useState(false);
  const defaultBorrowDays = 14;

  // check if we should do this in main component (see if userId would be visible on html props)
  const userIdFromSession = getUserId();

  const { data, setBorrow } = useTransaction();

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
            <b>Due Date:</b> {getDatePlusDays(defaultBorrowDays).toDateString()}
          </Typography>
          <Button
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            onClick={() => {
              setBorrow(inventoryId, userIdFromSession, defaultBorrowDays);
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

export const Return = ({
  inventoryId,
  transactionId,
}: {
  inventoryId: string;
  transactionId: string;
}) => {
  const [open, setOpen] = useState(false);

  // check if we should do this in main component (see if userId would be visible on html props)
  const userIdFromSession = getUserId();

  const { data, setNextStatus } = useTransaction();

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Return
      </Button>
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
              setNextStatus(
                inventoryId,
                transactionId,
                TransactionStatus.Returned
              );
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

export const Review = ({
  inventoryId,
  transactionId,
}: {
  inventoryId: string;
  transactionId: string;
}) => {
  const [open, setOpen] = useState(false);

  // check if we should do this in main component (see if userId would be visible on html props)
  const userIdFromSession = getUserId();

  const { data, setNextStatus } = useTransaction();

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Review
      </Button>
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
            <b>Review Date:</b> {getDatePlusDays(0).toDateString()}
          </Typography>
          <Button
            onClick={() => {
              setNextStatus(
                inventoryId,
                transactionId,
                TransactionStatus.Reviewed
              );
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
