import { Injectable, EventEmitter, Input, Output, Inject } from '@angular/core';
import { Account } from '../portfolio/model/account'
import { Http, Response,Headers } from '@angular/http';
import { Observable,BehaviorSubject } from 'rxjs/Rx';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { ExchangeRate } from '../order/model/exchange-rate';


// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import * as Rx from 'rxjs/Rx';

import 'whatwg-fetch';
import {Order} from "../order/model/order";

import {EmitterService} from './emitter-service';

@Injectable()
export class PortfolioService {

  @Input()
  public portfolio: Account[] = [
    {accountId: 4526647, balance: 57060, euroBalance: 50000, currency:'USD', variation: 0},
    {accountId: 8523495, balance: 50000, euroBalance: 50000, currency:'EUR', variation: 0},
    {accountId: 7320665, balance: 6387500, euroBalance: 50000, currency:'JPY', variation: 0},
    {accountId: 4451277, balance: 43966.5, euroBalance: 50000, currency:'GBP', variation: 0},
    {accountId: 4135811, balance: 74255, euroBalance: 50000, currency:'AUD', variation: 0},
    {accountId: 8220199, balance: 73925, euroBalance: 50000, currency:'CAD', variation: 0},
    {accountId: 3352455, balance: 54650, euroBalance: 50000, currency:'CHF', variation: 0}
  ];

  private _http = null;




  constructor(private http: Http) {
    this._http = http;
  }

  public getAccounts(): Account[]{
    return this.portfolio;
  }

  public getRate(baseCurrency: string, currency: string) {
    return this.http.get('http://api.fixer.io/latest?symbols='+currency+'&base='+baseCurrency).map((res:Response) => res.json());
  }


  public calculateAmount(rate: number, operation: string, amount: number): number {

    var exchangeAmount = amount / rate;
    exchangeAmount = parseFloat(exchangeAmount.toFixed(2));

    if(operation.toLowerCase()=="buy"){
      return -1*exchangeAmount;
    } else {
      return exchangeAmount;
    }
  }

  public getEuroBasedAmount(rate: number, amount: number): number{

    var euroBasedAmount = amount;
    if(rate!=1){
      console.log("euro based rate",rate);
      euroBasedAmount = amount / rate;

      console.log("euroBasedAmount1",euroBasedAmount);

      euroBasedAmount = parseFloat(euroBasedAmount.toFixed(2));

      console.log("euroBasedAmount2",euroBasedAmount);
      return euroBasedAmount;
    } else {
      console.log("rate 1 returning ",euroBasedAmount);
      return euroBasedAmount;
    }
  }

  public getAccountById(accountId: number): Account {
    return this.portfolio.find(a => a.accountId == accountId);
  }

  public getAccountByCurrency(currency: string): Account {
    return this.portfolio.find(a => a.currency == currency);
  }


  public placeOrder(order: Order) {

    console.log("placing order",order);

    if(order.operation.toLowerCase()=="buy"){
      this.getAccountById(order.fromAccountId).balance += order.exchangedAmount;
      this.getAccountById(order.fromAccountId).euroBalance += order.exchangedEuroAmount;

      this.getAccountByCurrency(order.toCurrency).balance += order.amount;
      this.getAccountByCurrency(order.toCurrency).euroBalance += order.euroAmount;

    } else if(order.operation.toLowerCase()=="sell"){
      this.getAccountById(order.fromAccountId).balance += order.exchangedAmount;
      this.getAccountById(order.fromAccountId).euroBalance += order.exchangedEuroAmount;

      this.getAccountByCurrency(order.toCurrency).balance -= order.amount;
      this.getAccountByCurrency(order.toCurrency).euroBalance -= order.euroAmount;
    }

    this.getAccountById(order.fromAccountId).variation = (this.getAccountById(order.fromAccountId).euroBalance / 50000)-1;
    this.getAccountByCurrency(order.toCurrency).variation = (this.getAccountByCurrency(order.toCurrency).euroBalance / 50000)-1;

    EmitterService.get("order-event").emit(this.portfolio);

  }
}


