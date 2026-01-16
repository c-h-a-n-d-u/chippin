// temporary data type for Friend

export type Friend = {
  id: number;
  name: string;
  amount: number;
  currencyCode: string;
  status: "You Pay" | "You Get";
  avatarUrl?: string;
};