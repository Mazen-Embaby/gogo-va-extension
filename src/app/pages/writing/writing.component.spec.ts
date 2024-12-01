import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingComponent } from './writing.component';

describe('WritingComponent', () => {
  let component: WritingComponent;
  let fixture: ComponentFixture<WritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
