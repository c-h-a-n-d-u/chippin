import type { Friend } from "../../types/friend";

type FriendsSummaryProps = {
    className?: string;
};
export default function FriendsSummary({className=""}: FriendsSummaryProps) {
    const friends: Friend[] = [
    {
      id: 1,
      name: "Pallavi",
      amount: 1802.75,
      currencyCode: "₹",
      status: "You Get",
      avatarUrl: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 2,
      name: "Manu",
      amount: 100,
      currencyCode: "₹",
      status: "You Pay",
      avatarUrl: "https://i.pravatar.cc/100?img=9",
    },
    {
      id: 3,
      name: "Chandana",
      amount: 50,
      currencyCode: "CA$",
      status: "You Pay",
      avatarUrl: "https://i.pravatar.cc/100?img=48",
    },
    {
      id: 4,
      name: "Sunitha",
      amount: 1400,
      currencyCode: "₹",
      status: "You Pay",
      avatarUrl: "https://i.pravatar.cc/100?img=2",
    },
  ];
    return (
        <div className={`mt-2 rounded-xl bg-white p-4 shadow-sm ${className}`}>
            <h2 className="text-2xl text-gray-800 mb-4 tracking-wide">Friends</h2>
            <div className="space-y-1 ">
                {friends.map( (friend) => {
                    return (
                        <div key={friend.id} className="flex rounded-lg p-2 shadow-sm hover:bg-gray-50 gap-4">
                            {/* Friend avatar */}
                            <div className="flex">
                                <img src={friend.avatarUrl} alt={friend.name} className="rounded-full w-10 h-10"/>
                            </div>
                            <div>
                                <p>{friend.name}</p>
                                <p>
                                    <span>{friend.status}</span>
                                    <span> </span>
                                    <span>{friend.currencyCode}</span>
                                    <span>{friend.amount}</span>
                                </p>
                            </div>
                        </div>
                    );
                }
                )}
            </div>
        </div>
        
    );
}