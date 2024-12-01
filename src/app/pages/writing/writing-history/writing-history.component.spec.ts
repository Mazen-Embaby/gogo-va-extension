import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingHistoryComponent } from './writing-history.component';

describe('WritingHistoryComponent', () => {
  let component: WritingHistoryComponent;
  let fixture: ComponentFixture<WritingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
