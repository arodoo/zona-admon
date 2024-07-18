import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNewModalComponent } from './chat-new-modal.component';

describe('ChatNewModalComponent', () => {
  let component: ChatNewModalComponent;
  let fixture: ComponentFixture<ChatNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatNewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
