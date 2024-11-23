import { Directive, ElementRef, HostListener } from '@angular/core';
import { InjectButtonService } from '../services/inject-button.service';

@Directive({
  selector: '[appTextareaFocus]',
  standalone: true,
})
export class TextareaFocusDirective {
  constructor(
    private el: ElementRef,
    private injectButtonService: InjectButtonService,
  ) {}

  @HostListener('focus') onFocus() {
    this.injectButtonService.injectButton(this.el.nativeElement);
  }
}
