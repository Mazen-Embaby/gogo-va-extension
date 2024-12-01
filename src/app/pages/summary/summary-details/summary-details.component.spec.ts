import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDetailsComponent } from './summary-details.component';

describe('SummaryDetailComponent', () => {
  let component: SummaryDetailsComponent;
  let fixture: ComponentFixture<SummaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
