import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAddModalComponent } from './register-add-modal.component';

describe('RegisterAddModalComponent', () => {
  let component: RegisterAddModalComponent;
  let fixture: ComponentFixture<RegisterAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAddModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
