import {Component} from '@angular/core';
import {convertResult} from "./types/convert";
import {ApiService} from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Currency Exchange';
  convertResults: convertResult


  constructor(private apiService: ApiService) {
  }

  processResult($event: convertResult) {
    this.apiService.getExchangeRate($event.quote, $event.base).subscribe((rate) => {
      this.convertResults = $event
      this.convertResults.reverseRate = rate
      this.convertResults.hidden = this.calcHidden(rate, $event.rate, $event.amount)
    })
  }

  //TODO: Not correct calculation!
  private calcHidden(rateA: number, rateB: number, amount: number): number{
    return Math.abs(rateA-rateB)*amount
  }
}
