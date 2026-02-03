import type { PendingSplit } from "../types/pendingSplit";

type DashboardExpensesResponse = {
  data: PendingSplit[];
  meta: {
    hasMore: boolean;
    nextExpenseId: number | null;
    count: number;
  };
};

export async function getDashboardExpenses(): Promise<PendingSplit[]> {
  const res = await fetch(
    import.meta.env.VITE_BACKEND_PATH + "dashboard/expenses",
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard expenses");
  }

  const json: DashboardExpensesResponse = await res.json();

  return json.data.map(expense => ({
    ...expense,
    expenseDate: new Date(expense.expenseDate), 
  }));
}

