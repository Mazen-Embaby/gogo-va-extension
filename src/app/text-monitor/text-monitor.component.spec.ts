import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMonitorComponent } from './text-monitor.component';

describe('TextMonitorComponent', () => {
  let component: TextMonitorComponent;
  let fixture: ComponentFixture<TextMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextMonitorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
