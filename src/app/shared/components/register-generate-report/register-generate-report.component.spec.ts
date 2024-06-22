import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGenerateReportComponent } from './register-generate-report.component';

describe('RegisterGenerateReportComponent', () => {
  let component: RegisterGenerateReportComponent;
  let fixture: ComponentFixture<RegisterGenerateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterGenerateReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterGenerateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
