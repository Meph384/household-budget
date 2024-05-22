export class Transaction {
  constructor(
    public transactionId?: number,
    public categoryId: number = 0,
    public description: string = '',
    public amount: number = 0,
    public date: Date = new Date()
  ) {}
}
