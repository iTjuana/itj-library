import { Status, Action } from "utils/enum";
import { api } from "utils/trpc";
import { logger } from "utils/logger";
import { useEffect, useState } from "react";

type Response = {
  success: boolean | null;
  message: string | null;
};

type Transaction = {
  id: string;
  actionDate: Date;
  userId: string;
  inventoryId: string;
  action: number;
  dueDate?: Date;
};

const getStatusFromAction = (action: number) => {
  switch (action) {
    case Action.Borrow:
      return Status.Borrowed;
    case Action.Return:
      return Status.In_review;
    case Action.Reviewed:
      return Status.Available;
    case Action.Retire:
      return Status.Unavailable;
    default:
      return Status.Other;
  }
};

export const useTransaction = (
  inventoryId: string,
  userId: string,
  action: number,
  daysBorrowed: number = 0
) => {
  if (userId === "0")
    return { success: false, message: "Error user not authenticated" };
  if (inventoryId === null)
    return { success: false, message: "Error inventoryId not valid" };
  if (action < 0 || action > Object.keys(Action).length)
    return { success: false, message: "Error action not a valid option" };
  if (daysBorrowed <= 0)
    return { success: false, message: "Error number of days not valid" };

  const [help, setHelp] = useState(true);

  const transactionMutation = api.transaction.add.useMutation();
  const transaction: Transaction = {
    id: "",
    actionDate: new Date(),
    userId: userId,
    inventoryId: inventoryId,
    action: action,
  };

  if (action === Action.Borrow) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysBorrowed);
    transaction.dueDate = dueDate;
  }

  transactionMutation.mutate(transaction);

  if (transactionMutation.isError) {
    logger.error(
      `Error creating transaction (userId: ${userId}, inventoryId: ${inventoryId})`,
      transactionMutation.error
    );
    return { success: false, message: "Error creating transaction" };
  }

  logger.info(
    `Transaction Created (id: ${transactionMutation.data?.id})`,
    transactionMutation.error
  );

  const inventoryMutation = api.inventory.update.useMutation();
  const inventoryStatus = getStatusFromAction(action);

  inventoryMutation.mutate({
    id: inventoryId,
    status: inventoryStatus,
  });

  if (inventoryMutation.isError) {
    logger.error(
      `Error updating inventory status (id: ${inventoryId})`,
      inventoryMutation.error
    );
    return {
      success: false,
      message: "Error updating inventory status",
    };
  }

  return { success: true, message: "Borrow was successful" };
};
