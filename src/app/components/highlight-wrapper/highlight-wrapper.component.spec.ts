import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightWrapperComponent } from './highlight-wrapper.component';

describe('HighlightWrapperComponent', () => {
  let component: HighlightWrapperComponent;
  let fixture: ComponentFixture<HighlightWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
