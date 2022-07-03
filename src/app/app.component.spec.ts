import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatCardModule} from "@angular/material/card";
import {FormComponent} from "./components/form/form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "./services/api.service";
import {of} from "rxjs";

describe('AppComponent', () => {
  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>(['getExchangeRate'])
    apiServiceSpy.getExchangeRate.and.returnValue(of(0))
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FormComponent
      ],
      imports:[MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule],
      providers: [{provide: ApiService, useValue: apiServiceSpy}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Currency Exchange'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Currency Exchange');
  });
});
