import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorizeComponent } from './colorize.component';

describe('ColorizeComponent', () => {
  let component: ColorizeComponent;
  let fixture: ComponentFixture<ColorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
