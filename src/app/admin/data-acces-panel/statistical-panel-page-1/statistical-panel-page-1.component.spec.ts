import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage1Component } from './statistical-panel-page-1.component';

describe('StatisticalPanelPage1Component', () => {
  let component: StatisticalPanelPage1Component;
  let fixture: ComponentFixture<StatisticalPanelPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
