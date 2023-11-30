import { Status, TransactionStatus } from "utils/enum";
import { api } from "utils/trpc";
import { logger } from "utils/logger";
import { useEffect, useState } from "react";

type Response = {
  success: boolean | undefined;
  message: string | undefined;
};

type CreateTransaction = {
  id?: string;
  userId: string;
  inventoryId: string;
  status: number;
  borrowDate: Date;
  dueDate?: Date;
  returnDate?: Date;
  reviewDate?: Date;
};

type UpdateTransaction = {
  id: string;
  userId?: string;
  inventoryId?: string;
  status?: number;
  borrowDate?: Date;
  dueDate?: Date;
  returnDate?: Date;
  reviewDate?: Date;
};

const getStatusFromTransactionStatus = (status: number) => {
  switch (status) {
    case TransactionStatus.Borrowed:
      return Status.Borrowed;
    case TransactionStatus.Returned:
      return Status.In_review;
    case TransactionStatus.Reviewed:
      return Status.Available;
    default:
      return Status.Other;
  }
};

const useTransaction = () => {
  const [data, setData] = useState<Response>({
    success: undefined,
    message: undefined,
  });
  
  const createTransactionMutation = api.transaction.add.useMutation();
  const updateTransactionMutation = api.transaction.update.useMutation();
  const inventoryMutation = api.inventory.update.useMutation();

  const setBorrow = (
    inventoryId: string,
    userId: string,
    daysBorrowed: number
  ) => {
    if (userId === "0") {
      setData({ success: false, message: "Error user not authenticated" });
      return;
    }
    if (inventoryId === null) {
      setData({ success: false, message: "Error inventoryId not valid" });
      return;
    }
    if (daysBorrowed <= 0) {
      setData({ success: false, message: "Error number of days not valid" });
      return;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysBorrowed);

    const transaction: CreateTransaction = {
      userId: userId,
      inventoryId: inventoryId,
      status: TransactionStatus.Borrowed,
      borrowDate: new Date(),
      dueDate: dueDate,
    };

    createTransactionMutation.mutate(transaction);

    if (createTransactionMutation.isError) {
      logger.error(
        `Error creating transaction (userId: ${userId}, inventoryId: ${inventoryId})`,
        createTransactionMutation.error
      );
      setData({ success: false, message: "Error creating transaction" });
      return;
    }

    logger.info(
      `Transaction Created (id: ${createTransactionMutation.data?.id ?? 0})`,
      createTransactionMutation.error
    );

    inventoryMutation.mutate({
      id: inventoryId,
      status: Status.Borrowed,
    });

    if (inventoryMutation.isError) {
      logger.error(
        `Error updating inventory status (id: ${inventoryId})`,
        inventoryMutation.error
      );
      setData({ success: false, message: "Error updating inventory status" });
      return;
    }

    setData({ success: true, message: "Borrow was successful" });
    return;
  };

  const setNextStatus = (
    inventoryId: string,
    transactionId: string,
    nextStatus: number
  ) => {
    if (transactionId == "0") {
      setData({ success: false, message: "Error transactionId not valid" });
      return;
    }

    const transaction: UpdateTransaction = {
      id: transactionId,
      status: nextStatus,
    };

    switch (nextStatus) {
      case TransactionStatus.Returned:
        transaction.returnDate = new Date();
        break;
      case TransactionStatus.Reviewed:
        transaction.reviewDate = new Date();
        break;
      default:
        break;
    }

    updateTransactionMutation.mutate(transaction);

    if (updateTransactionMutation.isError) {
      logger.error(
        `Error updating transaction (id: ${transactionId})`,
        updateTransactionMutation.error
      );
      setData({ success: false, message: "Error creating transaction" });
      return;
    }

    logger.info(
      `Transaction Updated (id: ${updateTransactionMutation.data?.id ?? 0})`,
      updateTransactionMutation.data
    );

    const inventoryStatus = getStatusFromTransactionStatus(nextStatus);

    inventoryMutation.mutate({
      id: inventoryId,
      status: inventoryStatus,
    });

    if (inventoryMutation.isError) {
      logger.error(
        `Error updating inventory status (id: ${inventoryId})`,
        inventoryMutation.error
      );
      setData({ success: false, message: "Error updating inventory status" });
      return;
    }

    setData({ success: true, message: "Borrow was successful" });
    return;
  };

  // const setStatus = (
  //   inventoryId: string,
  //   userId: string,
  //   transactionId: string,
  //   daysBorrowed: number
  // ) => {
  //   if (userId === "0") {
  //     setData({ success: false, message: "Error user not authenticated" });
  //     return;
  //   }
  //   if (inventoryId === null) {
  //     setData({ success: false, message: "Error inventoryId not valid" });
  //     return;
  //   }
  //   if (transactionId == "0") {
  //     setData({ success: false, message: "Error transactionId not valid" });
  //     return;
  //   }
  //   if (daysBorrowed <= 0) {
  //     setData({ success: false, message: "Error number of days not valid" });
  //     return;
  //   }

  //   const transaction: Transaction = {
  //     actionDate: new Date(),
  //     userId: userId,
  //     inventoryId: inventoryId,
  //     action: action,
  //   };

  //   if (action === Action.Borrow) {
  //     const dueDate = new Date();
  //     dueDate.setDate(dueDate.getDate() + daysBorrowed);
  //     transaction.dueDate = dueDate;
  //   }

  //   transactionMutation.mutate(transaction);

  //   if (transactionMutation.isError) {
  //     logger.error(
  //       `Error creating transaction (userId: ${userId}, inventoryId: ${inventoryId})`,
  //       transactionMutation.error
  //     );
  //     setData({ success: false, message: "Error creating transaction" });
  //     return;
  //   }

  //   logger.info(
  //     `Transaction Created (id: ${transactionMutation.data?.id})`,
  //     transactionMutation.error
  //   );

  //   const inventoryStatus = getStatusFromAction(action);

  //   inventoryMutation.mutate({
  //     id: inventoryId,
  //     status: inventoryStatus,
  //   });

  //   if (inventoryMutation.isError) {
  //     logger.error(
  //       `Error updating inventory status (id: ${inventoryId})`,
  //       inventoryMutation.error
  //     );
  //     setData({ success: false, message: "Error updating inventory status" });
  //     return;
  //   }

  //   setData({ success: true, message: "Borrow was successful" });
  //   return;
  // };

  return { data, setBorrow, setNextStatus };
};

export default useTransaction;
