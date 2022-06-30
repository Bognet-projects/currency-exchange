import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-results-item',
  templateUrl: './results-item.component.html',
  styleUrls: ['./results-item.component.scss']
})
export class ResultsItemComponent implements OnInit {
  @Input() label: string
  @Input() content: any

  constructor() { }

  ngOnInit(): void {
  }

}
