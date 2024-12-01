import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepChatConfigureComponent } from './deep-chat-configure.component';

describe('DeepChatConfigureComponent', () => {
  let component: DeepChatConfigureComponent;
  let fixture: ComponentFixture<DeepChatConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeepChatConfigureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepChatConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
