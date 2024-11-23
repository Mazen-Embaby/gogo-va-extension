import {
  AfterRenderRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-highlight-wrapper',
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './highlight-wrapper.component.html',
  styleUrl: './highlight-wrapper.component.scss',
})
export class HighlightWrapperComponent implements AfterViewInit {
  @ViewChild('divRef') private divRef!: ElementRef;
  @ContentChild('textAreaRef', { static: true }) textAreaRef!: ElementRef;

  // @ViewChild('textAreaRef', { static: true }) textAreaRef!: ElementRef;
  // @ViewChild('textAreaRef', { read: ViewContainerRef }) textAreaRef!: ViewContainerRef;
  // @ContentChildren('textAreaRef', { descendants: true }) textAreaRef!: QueryList<any>;

  textElement!: HTMLTextAreaElement;

  @Input() color = 'yellow';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.textElement = (
      this.el.nativeElement as HTMLInputElement
    ).querySelector('textarea')!;
  }
  write() {
    this.textElement.value = 'text changed';
  }
  ngAfterViewInit(): void {
    // console.log('divRef', this.divRef);
    // console.log('textRef', this.textAreaRef.nativeElement);
    // this.textAreaRef.nativeElement.setAttribute('appHighlight', 'red');
    // const bb = this.renderer.createElement('textarea');
    // bb.nativeElement.setAttribute('appHighlight', 'red');
    // this.textAreaRef.nativeElement.parent.appendChild(bb);
    // this.renderer.setAttribute( this.textAreaRef.nativeElement, 'appHighlight', 'red');
    // this.textAreaRef.nativeElement.
    // this.renderer.
  }
}
