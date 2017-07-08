import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import {DataTableModule} from "angular2-datatable";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MdRippleModule } from '@angular2-material/core/core';
import { HttpModule} from '@angular/http';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MDCPersistentDrawer, MDCPersistentDrawerFoundation, util} from '@material/drawer';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';


//
// import { MdtFooter } from 'angular-material-data-table';
// import { MdtHeader } from 'angular-material-data-table';
// import { MdtColumns } from 'angular-material-data-table';
// import { MdtRows } from 'angular-material-data-table';
// import { MdtCellAlign } from 'angular-material-data-table';
// import { MdtTable } from 'angular-material-data-table';

import { RouterModule, Routes } from '@angular/router';
import {AppComponent, AppService} from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { OrderComponent } from './order/order.component';
import { PortfolioService } from './service/portfolio.service';
import 'hammerjs';
import { GraphComponent } from './graph/graph.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { ChartModule } from 'angular2-highcharts';

declare var require: any;
export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  dd(hc);
  return hc;
}


const appRoutes: Routes = [
  { path: 'portfolio', component: MyPortfolioComponent },
  { path: 'chart',      component: GraphComponent },
  { path: '**', component: MyPortfolioComponent }
];




@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    OrderComponent,
    GraphComponent,
    MyPortfolioComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    MaterialModule,
    DataTableModule,
    // MdtFooter,MdtHeader,MdtColumns,MdtRows,MdtCellAlign,MdtTable,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    MdRippleModule,
    MdButtonModule,
    MdCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ChartModule

  ],
  providers: [PortfolioService, AppService,
    {provide: HighchartsStatic,useFactory: highchartsFactory}
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
