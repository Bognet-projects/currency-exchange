import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {symbolType} from "../../types/symbols";
import {ApiService} from "../../services/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {convertResult} from "../../types/convert";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  symbols: symbolType[] = []
  convertForm: FormGroup;
  @Output() convertResult = new EventEmitter<convertResult>()

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.apiService.getSymbols().subscribe((symbols) => this.symbols = symbols)
  }

  onSwitch() {
    const temp = this.baseCurrency.value
    this.baseCurrency.setValue(this.quoteCurrency.value)
    this.quoteCurrency.setValue(temp)
  }

  onConvert() {
    if (this.convertForm.valid) {
      this.apiService.convertCurrency(this.baseCurrency.value, this.quoteCurrency.value, this.amount.value).subscribe((result) => {
        this.convertResult.emit(result)
      })
    }
  }

  private initForm() {
    this.convertForm = this.formBuilder.group({
      baseCurrency: ['', [Validators.required]],
      quoteCurrency: ['', [Validators.required]],
      amount: [null, [Validators.min(0)]]
    })
  }

  get baseCurrency() {
    return this.convertForm.get('baseCurrency')
  }

  get quoteCurrency() {
    return this.convertForm.get('quoteCurrency')
  }

  get amount() {
    return this.convertForm.get('amount')
  }
}
