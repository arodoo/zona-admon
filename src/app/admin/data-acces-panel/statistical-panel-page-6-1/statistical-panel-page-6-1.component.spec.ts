import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelPage61Component } from './statistical-panel-page-6-1.component';

describe('StatisticalPanelPage61Component', () => {
  let component: StatisticalPanelPage61Component;
  let fixture: ComponentFixture<StatisticalPanelPage61Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelPage61Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelPage61Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
