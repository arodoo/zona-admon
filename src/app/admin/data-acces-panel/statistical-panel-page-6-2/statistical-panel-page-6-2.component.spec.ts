import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage62Component } from './statistical-panel-page-6-2.component';

describe('StatisticalPanelPage62Component', () => {
  let component: StatisticalPanelPage62Component;
  let fixture: ComponentFixture<StatisticalPanelPage62Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage62Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage62Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
