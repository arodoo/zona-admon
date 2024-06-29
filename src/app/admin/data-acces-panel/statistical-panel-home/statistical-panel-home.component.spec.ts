import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelHomeComponent } from './statistical-panel-home.component';

describe('StatisticalPanelHomeComponent', () => {
  let component: StatisticalPanelHomeComponent;
  let fixture: ComponentFixture<StatisticalPanelHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
