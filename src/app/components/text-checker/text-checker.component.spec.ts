import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCheckerComponent } from './text-checker.component';

describe('TextCheckerComponent', () => {
  let component: TextCheckerComponent;
  let fixture: ComponentFixture<TextCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
