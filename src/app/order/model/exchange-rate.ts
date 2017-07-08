export class ExchangeRate {

  base: string;
  date: string;
  rates: Map<string,number>;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
