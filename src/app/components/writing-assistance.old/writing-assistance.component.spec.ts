import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingAssistanceComponent } from './writing-assistance.component';

describe('WritingAssistanceComponent', () => {
  let component: WritingAssistanceComponent;
  let fixture: ComponentFixture<WritingAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingAssistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
