import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage7Component } from './statistical-panel-page-7.component';

describe('StatisticalPanelPage7Component', () => {
  let component: StatisticalPanelPage7Component;
  let fixture: ComponentFixture<StatisticalPanelPage7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage7Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
