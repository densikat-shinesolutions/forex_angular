export class Order {

  operation: string;
  fromCurrency: string;
  amount: number;
  euroAmount: number;
  fromAccountId: number;
  toCurrency: string;
  exchangedAmount: number;
  exchangedEuroAmount: number;
  toAccountId: number;
  exchangeRate: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }



}
