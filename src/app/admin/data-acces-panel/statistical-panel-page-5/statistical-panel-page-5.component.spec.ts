import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage5Component } from './statistical-panel-page-5.component';

describe('StatisticalPanelPage5Component', () => {
  let component: StatisticalPanelPage5Component;
  let fixture: ComponentFixture<StatisticalPanelPage5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
