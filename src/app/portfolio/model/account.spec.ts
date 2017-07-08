import {Account} from './account';

describe('Account', () => {
  it('should create an instance', () => {
    expect(new Account()).toBeTruthy();
  });


  it('should accept values in the constructor', () => {
    let account = new Account({
      accountId: 12345678,
      balance: 32785,
      euroBalance: 28728.53,
      currency: "USD"
    });
    expect(account.currency).toEqual("USD");
  });


});
