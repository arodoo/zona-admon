import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalPanelSpecificTownComponent } from './statistical-panel-specific-town.component';

describe('StatisticalPanelSpecificTownComponent', () => {
  let component: StatisticalPanelSpecificTownComponent;
  let fixture: ComponentFixture<StatisticalPanelSpecificTownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalPanelSpecificTownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalPanelSpecificTownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
