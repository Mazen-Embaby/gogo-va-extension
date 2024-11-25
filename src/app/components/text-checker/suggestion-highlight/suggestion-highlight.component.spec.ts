import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionHighlightComponent } from './suggestion-highlight.component';

describe('SuggestionHighlightComponent', () => {
  let component: SuggestionHighlightComponent;
  let fixture: ComponentFixture<SuggestionHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionHighlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
