import PendingSplitsRow  from "./PendingsplitsRow"
import type { PendingSplit } from "../../types/pendingSplit";
import { getDashboardExpenses } from "../../services/dashboardExpenses";
import { useEffect, useState } from "react";

type PendingSplitsSummaryProps = {
  className?: string;
};

export default function PendingSplitsSummary({className=""}: PendingSplitsSummaryProps) {
  
  const [pendingSplits, setPendingSplits] = useState<PendingSplit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSplits = async () => {
      const data = await getDashboardExpenses();
      setPendingSplits(data);
      setLoading(false);
    };

    fetchSplits();
  }, []);

  if (loading) {
    return <div className={className}>Loading...</div>;
  }
    // const pendingSplits: PendingSplit[] = await getDashboardExpenses();
    // [
    //     {
    //       id: 1,
    //       name: "Birthday House",
    //       date: "Mar 24",
    //       amount: "₹1,250.00",
    //       status: "You Pay",
    //     },
    //     {
    //       id: 2,
    //       name: "Shopping",
    //       date: "Mar 22",
    //       amount: "₹3,400.00",
    //       status: "You Get",
    //     },
    //     {
    //       id: 3,
    //       name: "Pizza Night",
    //       date: "Jan 16",
    //       amount: "₹150.00",
    //       status: "You Pay",
    //     },
    //     {
    //       id: 4,
    //       name: "Waffles and Burger",
    //       date: "Jan 16",
    //       amount: "₹100.00",
    //       status: "You Get",
    //     },
    //     {
    //       id: 5,
    //       name: "Tteokbokki",
    //       date: "Jan 5",
    //       amount: "₹750.00",
    //       status: "You Get",
    //     },
    //   ];
    return (
        <div className={`${className}`}>
              <h2 className="text-2xl text-gray-800 mb-4 tracking-wide">Pending Splits</h2>
              {/* Pending Splits List */}
              <div className="bg-white rounded-xl shadow-sm sm:px-4">
                {/* Header */}
                <div className="hidden px-1 sm:flex items-center text-sm text-gray-500 font-medium pb-3 border-b">
                  <div className="flex-1">Name</div>
                  <div className="hidden sm:block sm:w-32">Date</div>
                  <div className="w-32 text-right">Total</div>
                  <div className="w-32 text-right">Status</div>
                </div>
                {/* Pending Split Items */}
                <div className="divide-y">

                  {pendingSplits.map(split => (
                    <PendingSplitsRow
                      key={split.expenseId}
                      expenseName={split.expenseName}
                      expenseDate={split.expenseDate}
                      amount={split.amount}
                      balance={split.balance}
                    />
                  ))}
                  

                </div>
              </div>
            </div>
    );
}