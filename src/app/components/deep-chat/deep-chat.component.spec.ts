import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepChatComponent } from './deep-chat.component';

describe('DeepChatComponent', () => {
  let component: DeepChatComponent;
  let fixture: ComponentFixture<DeepChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
