import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import {MatCardModule} from "@angular/material/card";
import {ResultsItemComponent} from "../results-item/results-item.component";

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsComponent, ResultsItemComponent ],
      imports: [MatCardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;

    component.result = {amount: 0, quote: '', base: '', rate: 0}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
