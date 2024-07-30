import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage6Component } from './statistical-panel-page-6.component';

describe('StatisticalPanelPage6Component', () => {
  let component: StatisticalPanelPage6Component;
  let fixture: ComponentFixture<StatisticalPanelPage6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage6Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
