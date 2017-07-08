import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Account } from './model/account'
import {PortfolioService} from "../service/portfolio.service";
import {EmitterService} from '../service/emitter-service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  providers: [
    PortfolioService,
  ]
})
export class PortfolioComponent implements OnInit {

  @Input()
  portfolio;


  constructor(private portfolioService: PortfolioService) {

    EmitterService.get("order-event").subscribe(data => {
      console.log("order-event ", data)
      this.portfolio = data;
    });

  }


  ngOnInit() {
      this.portfolio = this.portfolioService.getAccounts();
  }

}
