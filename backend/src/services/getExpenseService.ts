import { Prisma } from "@prisma/client";
import { prisma } from "../db/connectDB.js";

export default async function getExpenseService(userId: bigint, lastExpenseId?: bigint, limit: number = 20) {

    let where: Prisma.ExpensesWhereInput = {
        OR: [
            { createdBy: userId },
            { expenseShares: { some: { userId: userId } } }
        ]
    };

    const expenses = await prisma.expenses.findMany({
                where: where,
                include: {
                    expenseShares: true
                },
                take: limit + 1,
                cursor: lastExpenseId ? { expenseId: lastExpenseId } : undefined,
                skip: lastExpenseId ? 1 : 0,
                orderBy: {
                    updatedAt: "desc"
                }
            })
    return expenses; 
}