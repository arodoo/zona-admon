import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartAccidentsComponent } from './line-chart-accidents.component';

describe('LineChartAccidentsComponent', () => {
  let component: LineChartAccidentsComponent;
  let fixture: ComponentFixture<LineChartAccidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartAccidentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineChartAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
