import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationHistoryComponent } from './translation-history.component';

describe('TranslationHistoryComponent', () => {
  let component: TranslationHistoryComponent;
  let fixture: ComponentFixture<TranslationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
