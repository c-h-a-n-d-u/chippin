import PendingSplitsRow  from "./PendingsplitsRow"
import type { PendingSplit } from "../../types/pendingSplit";

type PendingSplitsSummaryProps = {
  className?: string;
};

export default function PendingSplitsSummary({className=""}: PendingSplitsSummaryProps) {
    const pendingSplits: PendingSplit[] = [
        {
          id: 1,
          name: "Birthday House",
          date: "Mar 24",
          amount: "₹1,250.00",
          status: "You Pay",
        },
        {
          id: 2,
          name: "Shopping",
          date: "Mar 22",
          amount: "₹3,400.00",
          status: "You Get",
        },
        {
          id: 3,
          name: "Pizza Night",
          date: "Jan 16",
          amount: "₹150.00",
          status: "You Pay",
        },
        {
          id: 4,
          name: "Waffles and Burger",
          date: "Jan 16",
          amount: "₹100.00",
          status: "You Get",
        },
        {
          id: 5,
          name: "Tteokbokki",
          date: "Jan 5",
          amount: "₹750.00",
          status: "You Get",
        },
      ];
    return (
        <div className={`mt-6 ${className}`}>
              <h2 className="text-2xl text-gray-800 mb-4 tracking-wide">Pending Splits</h2>
              {/* Pending Splits List */}
              <div className="bg-white rounded-xl shadow-sm p-2 sm:p-4">
                {/* Header */}
                <div className="hidden sm:flex items-center text-sm text-gray-500 font-medium pb-3 border-b">
                  <div className="flex-1">Name</div>
                  <div className="hidden sm:block sm:w-32">Date</div>
                  <div className="w-32 text-right">Total</div>
                  <div className="w-32 text-right">Status</div>
                </div>
                {/* Pending Split Items */}
                <div className="divide-y">

                  {pendingSplits.map(split => (
                    <PendingSplitsRow
                      key={split.id}
                      name={split.name}
                      date={split.date}
                      amount={split.amount}
                      status={split.status}
                    />
                  ))}
                  

                </div>
              </div>
            </div>
    );
}