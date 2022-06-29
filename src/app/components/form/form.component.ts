import { Component, OnInit } from '@angular/core';
import {symbolType} from "../../types/symbols";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  symbols: symbolType[] = []
  fromValue: symbolType = {code: ''};
  toValue: symbolType = {code: ''};

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getSymbols().subscribe((symbols) => this.symbols = symbols)
  }

  onSwitch(){
    const temp: symbolType = this.fromValue;
    this.fromValue = this.toValue;
    this.toValue = temp;
  }

}
