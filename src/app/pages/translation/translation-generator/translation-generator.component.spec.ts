import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationGeneratorComponent } from './translation-generator.component';

describe('TranslationGeneratorComponent', () => {
  let component: TranslationGeneratorComponent;
  let fixture: ComponentFixture<TranslationGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
