import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteAssistanceComponent } from './write-assistance.component';

describe('WriteAssistanceComponent', () => {
  let component: WriteAssistanceComponent;
  let fixture: ComponentFixture<WriteAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteAssistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
