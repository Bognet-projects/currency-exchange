import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  symbols: string[] = ['USD', 'HUF', 'EUR']
  fromValue: string = '';
  toValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSwitch(){
    const temp: string = this.fromValue;
    this.fromValue = this.toValue;
    this.toValue = temp;
  }

}
