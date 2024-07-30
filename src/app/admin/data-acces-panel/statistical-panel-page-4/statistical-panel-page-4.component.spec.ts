import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage4Component } from './statistical-panel-page-4.component';

describe('StatisticalPanelPage4Component', () => {
  let component: StatisticalPanelPage4Component;
  let fixture: ComponentFixture<StatisticalPanelPage4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
