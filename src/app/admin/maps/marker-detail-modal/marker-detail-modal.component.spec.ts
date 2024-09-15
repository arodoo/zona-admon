import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDetailModalComponent } from './marker-detail-modal.component';

describe('MarkerDetailModalComponent', () => {
  let component: MarkerDetailModalComponent;
  let fixture: ComponentFixture<MarkerDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkerDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarkerDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
