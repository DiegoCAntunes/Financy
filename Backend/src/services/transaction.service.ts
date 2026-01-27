import { prismaClient } from "../../prisma/prisma";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    return prismaClient.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        date: data.date,
        type: data.type,
        categoryId: data.categoryId,
        userId,
      },
    });
  }

  async updateTransaction(
    id: string,
    data: UpdateTransactionInput,
    userId: string,
  ) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) throw new Error("Transaction not found");
    if (transaction.userId !== userId) throw new Error("Not authorized");

    return prismaClient.transaction.update({
      where: { id },
      data: {
        description: data.description ?? undefined,
        amount: data.amount ?? undefined,
        date: data.date ?? undefined,
        type: data.type ?? undefined,
        categoryId: data.categoryId ?? undefined,
      },
    });
  }

  async listTransactionsByUser(userId: string) {
    return prismaClient.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  }

  async deleteTransaction(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id },
    });

    if (!transaction) throw new Error("Transaction not found");
    if (transaction.userId !== userId) throw new Error("Not authorized");

    return prismaClient.transaction.delete({ where: { id } });
  }
}
