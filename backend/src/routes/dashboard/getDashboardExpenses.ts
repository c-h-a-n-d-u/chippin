// It is an endpoint to get the dashboard splits data for a user.
// The request takes query params: limit (number of records to fetch) and lastSplitId (for pagination).
import { Request, Response } from "express";
import { z } from "zod";
import { ExpenseError, ExpenseErrorObject } from '../../interfaces/ErrorHandlers/ExpenseErrorHandler.js';
import { ErrorResponse } from "../../interfaces/ErrorHandlers/genericErrorHandler.js";
import getExpenseService from "../../services/getExpenseService.js";
import { parseObject } from '../../utils/commonUtil.js';

export const DashboardExpensesQuerySchema = z.object({
    //pagination
    lastExpenseId: z.coerce.bigint().optional(),
    limit: z.coerce.number().optional().default(20)
})

type uiExpense = {
    expenseId: bigint;
    expenseName: string;
    groupName: bigint | null; // Placeholder, replace with actual group name type
    amount: number;
    currencyCode: number; // Placeholder, replace with actual currency code type
    expenseDate: Date;
    balance: number;
}

export async function getDashboardExpenses(req: Request, res: Response) {
    try {
        const user = req.user;

        //invalid user
        if (!user || typeof user.userId !== "bigint" || user.userId <= 0n) {
            throw ErrorResponse.errorFromCode("INVALID_JWT");
        }

        //check if the query is as expected, if not throw an error
        const result = DashboardExpensesQuerySchema.safeParse(req.query);
        if (!result.success) {
            throw new ExpenseError("ERROR_EVAULATING_QUERY_PARAMS", result.error.issues[0].message);
        }

        const userId = user.userId;

        const { lastExpenseId, limit } = result.data;

        const expenses = await getExpenseService(userId, lastExpenseId, limit+1); //fetch one extra to check if more records are there
        const hasMore = expenses.length > limit;
        const paginatedExpenses = hasMore ? expenses.slice(0, limit) : expenses;

        const uiExpenses: uiExpense[] = paginatedExpenses.map(expense => {
            const userShare = expense.expenseShares.find(
            share => share.userId === userId
            );

            return {
                expenseId: expense.expenseId,
                expenseName: expense.expenseName,
                amount: expense.amount,
                currencyCode: expense.currencyId,
                expenseDate: expense.expenseDate,
                groupName: expense.groupId ?? null,
                balance: userShare ? userShare.paidAmount - userShare.owedAmount : 0
            };
        });

        res.send(parseObject({
                    data: uiExpenses,
                    meta: {
                        hasMore,
                        nextExpenseId: hasMore ? uiExpenses[uiExpenses.length - 1].expenseId : null,
                        count: uiExpenses.length
                    }
            }));
    }catch (error) {
        res.send(error);
    }
}