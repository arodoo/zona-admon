import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlargedImageComponent } from './enlarged-image.component';

describe('EnlargedImageComponent', () => {
  let component: EnlargedImageComponent;
  let fixture: ComponentFixture<EnlargedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnlargedImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnlargedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
