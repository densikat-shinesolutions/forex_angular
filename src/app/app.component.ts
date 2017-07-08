import { Component, EventEmitter, Injectable, Output, Input } from '@angular/core';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription'
import {PortfolioService} from "./service/portfolio.service";
import {OrderComponent} from "./order/order.component";
import {EmitterService} from './service/emitter-service';

import {MDCPersistentDrawer, MDCPersistentDrawerFoundation, util} from '@material/drawer';

@Injectable()
export class AppService {

  constructor() {
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    AppService, PortfolioService
  ]
})
export class AppComponent {
  title = 'app';




  constructor(private _service:AppService, private portfolioService: PortfolioService) {
  }

  ngOnInit(){
  }

}
