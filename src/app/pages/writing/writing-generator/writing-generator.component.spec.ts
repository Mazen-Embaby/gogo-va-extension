import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingGeneratorComponent } from './writing-generator.component';

describe('WritingGeneratorComponent', () => {
  let component: WritingGeneratorComponent;
  let fixture: ComponentFixture<WritingGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
