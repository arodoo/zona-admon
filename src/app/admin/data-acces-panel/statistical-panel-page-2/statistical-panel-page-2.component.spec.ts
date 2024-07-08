import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage2Component } from './statistical-panel-page-2.component';

describe('StatisticalPanelPage2Component', () => {
  let component: StatisticalPanelPage2Component;
  let fixture: ComponentFixture<StatisticalPanelPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
