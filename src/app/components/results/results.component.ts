import {Component, Input, OnInit} from '@angular/core';
import {convertResult} from "../../types/convert";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() result: convertResult

  constructor() { }

  ngOnInit(): void {
  }

}
