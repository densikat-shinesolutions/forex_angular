export class Account {

  accountId: number;
  balance: number;
  euroBalance: number;
  currency: string;
  variation: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}


