export interface Transaction {
  transactionId: number;
  categoryTitle: string;
  currencyCode: string;
  description: string;
  amount: number;
  date: Date;
}
