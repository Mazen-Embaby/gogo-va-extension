import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationDetailsComponent } from './translation-details.component';

describe('TranslationDetailsComponent', () => {
  let component: TranslationDetailsComponent;
  let fixture: ComponentFixture<TranslationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
