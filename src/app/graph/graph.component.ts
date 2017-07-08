import { Component, OnInit } from '@angular/core';
import { Http }              from '@angular/http';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private http: Http) {

    http.get('http://localhost:8080/fxRates?currencyPair=USDEUR').subscribe(res => {
      this.options = {
        title : { text : 'USDEUR' },
        series : [{
          name : 'USDEUR',
          data : res.json(),
          tooltip: {
            valueDecimals: 6
          }
        }]
      };
    });
  }

  options: Object;

  private currencyPair: string;

  ngOnInit() {
  }

  changeChartCurrencies(currencyPair: string){

    this.http.get('http://localhost:8080/fxRates?currencyPair='+currencyPair).subscribe(res => {
      this.options = {
        title : { text : currencyPair  },
        series : [{
          name : currencyPair,
          data : res.json(),
          tooltip: {
            valueDecimals: 6
          }
        }]
      };
    });

  }

}
