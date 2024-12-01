import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGeneratorComponent } from './summary-generator.component';

describe('SummaryGeneratorComponent', () => {
  let component: SummaryGeneratorComponent;
  let fixture: ComponentFixture<SummaryGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
