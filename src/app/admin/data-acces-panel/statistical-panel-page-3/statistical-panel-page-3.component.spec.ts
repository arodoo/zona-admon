import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage3Component } from './statistical-panel-page-3.component';

describe('StatisticalPanelPage3Component', () => {
  let component: StatisticalPanelPage3Component;
  let fixture: ComponentFixture<StatisticalPanelPage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
