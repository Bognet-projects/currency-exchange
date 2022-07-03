import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormComponent} from './form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../../services/api.service";
import {of} from "rxjs";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>(['getSymbols', 'convertCurrency'])
    apiServiceSpy.getSymbols.and.returnValue(of([]))

    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatInputModule, NoopAnimationsModule],
      providers: [{provide: ApiService, useValue: apiServiceSpy}]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
