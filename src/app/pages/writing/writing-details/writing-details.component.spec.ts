import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingDetailsComponent } from './writing-details.component';

describe('WritingDetailComponent', () => {
  let component: WritingDetailsComponent;
  let fixture: ComponentFixture<WritingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
