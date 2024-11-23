import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { InjectButtonService } from '../services/inject-button.service';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = 'yellow';
  textElement!: HTMLTextAreaElement;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private injectButtonService: InjectButtonService,
  ) {}
  ngOnInit(): void {
    this.textElement = (
      this.el.nativeElement as HTMLInputElement
    ).querySelector('textarea')!;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      this.appHighlight,
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }

  @HostListener('input') textChange() {
    const inputValue = this.textElement.value;
    console.debug('input value:', inputValue);
  }

  @HostListener('focusin') onFocus() {
    console.debug('focusin');
    // this.injectButtonService.injectButton(this.el.nativeElement);
  }

  @HostListener('focusout') blu() {
    console.debug('focusout');
    // this.injectButtonService.injectButton(this.el.nativeElement);
  }

  changeText(text: string) {
    this.textElement.value = text;
  }
}
