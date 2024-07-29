import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStatisticalPanelPage3Component } from './app-statistical-panel-page-3.component';

describe('AppStatisticalPanelPage3Component', () => {
  let component: AppStatisticalPanelPage3Component;
  let fixture: ComponentFixture<AppStatisticalPanelPage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStatisticalPanelPage3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppStatisticalPanelPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
