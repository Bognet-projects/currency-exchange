import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatCardModule} from "@angular/material/card";
import {ApiService} from "./services/api.service";
import {of} from "rxjs";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>(['getExchangeRate'])
    apiServiceSpy.getExchangeRate.and.returnValue(of(0))
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[MatCardModule],
      providers: [{provide: ApiService, useValue: apiServiceSpy}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
