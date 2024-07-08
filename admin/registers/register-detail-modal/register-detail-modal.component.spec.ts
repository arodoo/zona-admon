import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDetailModalComponent } from './register-detail-modal.component';

describe('RegisterDetailModalComponent', () => {
  let component: RegisterDetailModalComponent;
  let fixture: ComponentFixture<RegisterDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
