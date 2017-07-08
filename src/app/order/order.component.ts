import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import { Order } from './model/order';
import { Account } from '../portfolio/model/account';
import { ExchangeRate } from './model/exchange-rate';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [
    PortfolioService
  ]
})
export class OrderComponent implements OnInit {


  portfolio;
  public order = new Order();


  constructor(private portfolioService: PortfolioService
  ) {}


  ngOnInit() {
    this.portfolio = this.portfolioService.getAccounts();
  }


  onSubmit() {
    setTimeout(() => {
      console.log(this.order);

      if(!isNaN(this.order.amount)&&!isNaN(this.order.euroAmount)&&!isNaN(this.order.exchangedAmount)&&!isNaN(this.order.exchangedEuroAmount)){
        this.portfolioService.placeOrder(this.order);
      }
    }, 1000);

  }

  resetOrder(order: Order){
    order = new Order();
    this.order = new Order();
  }

  setExchangeAmount(order: Order) {

      let account = new Account();
      account = this.portfolioService.getAccountById(order.fromAccountId);

      order.fromCurrency = account.currency;

    if(order.toCurrency.valueOf() != order.fromCurrency.valueOf()){

      this.portfolioService.getRate(order.fromCurrency,order.toCurrency)
        .subscribe(
          data => {
            let exchangeRate = new ExchangeRate();
            exchangeRate = data;
            this.order.exchangeRate = exchangeRate.rates[order.toCurrency];
            order.exchangedAmount = this.portfolioService.calculateAmount(order.exchangeRate,order.operation, order.amount);
          },
          err => { console.log("error",err) }
        );


      // get euro amount
      if(order.toCurrency.valueOf()=="EUR"){
        order.euroAmount= this.portfolioService.getEuroBasedAmount(1,order.amount);
      } else {
        this.portfolioService.getRate('EUR',order.toCurrency)
          .subscribe(
            data => {
              let exchangeRate = new ExchangeRate();
              exchangeRate = data;
              order.euroAmount= this.portfolioService.getEuroBasedAmount(exchangeRate.rates[order.toCurrency],order.amount);
            },
            err => { console.log("error",err) }
          );
      }


      setTimeout(() => {
        if(order.fromCurrency.valueOf() == "EUR"){
          order.exchangedEuroAmount = this.portfolioService.getEuroBasedAmount(1, order.exchangedAmount);
        }else {
          this.portfolioService.getRate('EUR',order.fromCurrency)
            .subscribe(
              data => {
                let exchangeRate = new ExchangeRate();
                exchangeRate = data;
                order.exchangedEuroAmount = this.portfolioService.getEuroBasedAmount(exchangeRate.rates[order.fromCurrency], order.exchangedAmount);
              },
              err => { console.log("error",err) }
            );
        }
        this.order = order;
        console.log(this.order);

      }, 1000);
    }

  }
}
