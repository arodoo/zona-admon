import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePredictionModuleComponent } from './use-prediction-module.component';

describe('UsePredictionModuleComponent', () => {
  let component: UsePredictionModuleComponent;
  let fixture: ComponentFixture<UsePredictionModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsePredictionModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsePredictionModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
