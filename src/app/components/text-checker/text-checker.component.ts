import {
  AfterViewInit,
  Component,
  ComponentRef,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
  ViewContainerRef, OnInit,
} from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { TextCheckerService } from './text-checker.service';
import { GrammarMockService } from './text-checker.mock.service';
import UtilHelper from '../../utils/util-helper';
import { SuggestionHighlightComponent } from './suggestion-highlight/suggestion-highlight.component';
import { distinctUntilChanged, map } from 'rxjs';
import SuggestionData from './type/suggestion-data.interface';

@Component({
  selector: 'app-text-checker',
  standalone: true,
  imports: [SuggestionHighlightComponent],
  templateUrl: './text-checker.component.html',
  styleUrl: './text-checker.component.scss',
})
export class TextCheckerComponent implements AfterViewInit, OnInit {
  @ViewChild('divRef') private divRef!: ElementRef;
  @ContentChild('textAreaRef', { static: true }) textAreaRef!: ElementRef;

  // @ViewChild('textChecker') private highlighter!: ElementRef;

  @ViewChild('textChecker', { read: ViewContainerRef, static: true })
  textChecker!: ViewContainerRef;

  textElement!: HTMLTextAreaElement;
  counterComponents = 0; // mistake | none

  // @ViewChild('textAreaRef', { static: true }) textAreaRef!: ElementRef;
  // @ViewChild('textAreaRef', { read: ViewContainerRef }) textAreaRef!: ViewContainerRef;
  // @ContentChildren('textAreaRef', { descendants: true }) textAreaRef!: QueryList<any>;

  @Input() color = 'yellow';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private textCheckerService: TextCheckerService,
    private grammarMockService: GrammarMockService,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.textElement = (
      this.el.nativeElement as HTMLTextAreaElement
    ).querySelector('textarea')!;

    this.textCheckerService.setSelectedTextChecker(this.textChecker);
  }
  write() {
    this.textElement.value = 'text changed';
  }

  ngAfterViewInit(): void {
    this.textCheckerService.textareaValue$
      .pipe(
        distinctUntilChanged((prev, curr) => {
          return prev == curr;
        }),
      )
      .subscribe((v) => {
        if (this.textElement.value != v) {
          console.log('CHANGETEXT FUNC,,,');
          this.textElement.value = v;
        }
        this.checkText();
      });
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

  // @HostListener('mouseenter') onMouseEnter() {
  //   console.log('MouseEnter..');
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  // }

  @HostListener('input') textChange() {
    const inputValue = this.textElement.value;
    this.textCheckerService.textareaValue$.next(inputValue);
  }

  @HostListener('focusin') onFocus() {
    console.debug('focusin');
    // this.injectButtonService.injectButton(this.el.nativeElement);
  }

  @HostListener('focusout') blu() {
    console.debug('focusout');
    // this.injectButtonService.injectButton(this.el.nativeElement);
  }

  async checkText() {
    const text = this.textElement.value;
    // Simulate grammar analysis with mock data
    const issues = await this.grammarMockService.mockGrammarResponse(text);
    // const issues = await this.textCheckerService.checkMistakes(text);
    console.debug('Issues Error(Improve):', issues);
    await this.updateUI(text, issues);
  }

  updateUI(fullText: string, issues: SuggestionData[]) {
    // Remove all suggestion | text
    (this.textChecker.element.nativeElement as HTMLDivElement).innerHTML = '';

    const itemIdx = 0;
    this.counterComponents = 0;
    if (!issues || issues.length === 0)
      return this.textCheckerService.escapeHtml(fullText);

    const resultText = '';
    let lastIndex = 0;

    issues.forEach((issue) => {
      const { offset, length } = issue;

      console.log(`LIDX: ${lastIndex}`);
      if (lastIndex != offset) {
        this.createNewComponent(
          this.textCheckerService.escapeHtml(fullText.slice(lastIndex, offset)),
          null,
        );
        // resultText += `<span>${this.writeService.escapeHtml(fullText.slice(lastIndex, offset))}</span>`;
        lastIndex = offset;
        console.log(`LIDX: ${lastIndex}`);

        this.createNewComponent(
          this.textCheckerService.escapeHtml(
            fullText.slice(lastIndex, offset + length),
          ),
          issue,
        );
        // resultText += `<span class="highlight">${this.writeService.escapeHtml(fullText.slice(lastIndex, offset + length))}</span>`;
        lastIndex = offset + length;
        console.log(`LIDX: ${lastIndex}`);
      } else {
        this.createNewComponent(
          this.textCheckerService.escapeHtml(
            fullText.slice(lastIndex, lastIndex + length),
          ),
          issue,
        );
        // resultText += `<span class="highlight">${this.writeService.escapeHtml(fullText.slice(lastIndex, lastIndex + length))}</span>`;
        lastIndex += length;
        console.log(`lastIndex: ${lastIndex}`);
      }
    });

    // Add remaining text
    this.createNewComponent(
      this.textCheckerService.escapeHtml(fullText.slice(lastIndex)),
      null,
    );
    // resultText += fullText.slice(lastIndex);
    lastIndex += fullText.length;

    this.textChecker.element.nativeElement = UtilHelper.cloneTextareaStyle(
      this.textElement,
      this.textChecker.element.nativeElement,
    );

    // this.highlighter.nativeElement.style =  this.textElement.style;
    // this.highlighter.nativeElement.style.height = `${this.textElement.scrollHeight}px`;
    // this.highlighter.nativeElement.style.width = `${this.textElement.scrollWidth}px`;

    return resultText;
  }

  createNewComponent(inner: string, issue: SuggestionData | null) {
    // Step 1: Dynamically create the component
    const componentRef: ComponentRef<SuggestionHighlightComponent> =
      this.viewContainer.createComponent(SuggestionHighlightComponent);
    // const componentRef = this.highlighter.createComponent(SuggestionHighlightComponent);
    componentRef.instance.inner = inner;
    componentRef.instance.type = issue ? 'suggestion' : 'none';
    componentRef.instance.infor = issue;

    // Step 2: Append the component's host view inside the target div
    const hostElement = componentRef.location.nativeElement;
    this.textChecker.element.nativeElement.appendChild(hostElement);
    this.counterComponents++;
    this.textCheckerService.setSelectedTextChecker(this.textChecker);
  }

  // create(innerHTML: string, isMistake: boolean) {

  //   // const xx = (this.highlighter.nativeElement as HTMLDivElement).createComponent(SuggestionHighlightComponent)

  //   // const xx = this.viewContainer.createComponent(SuggestionHighlightComponent);
  //   // xx.instance.inner = innerHTML;

  //   // (this.highlighter.nativeElement as HTMLDivElement).appendChild(xx);

  //   // const x = this.renderer.createElement('app-suggestion-highlight');

  //   // console.log('x', x);
  //   // this.renderer.setAttribute(x, 'inner', innerHTML);
  //   // // x.innerHTML = innerHTML;
  //   // if (useClass) {
  //   //   this.renderer.setAttribute(x, 'type', 'none');
  //   // }
  //   // else{
  //   //   this.renderer.setAttribute(x, 'type', 'suggestion');
  //   // }

  //   // this.highlighter.nativeElement.appendChild(x);
  // }

  // createComponent() {
  //   // const xx = this.injector.createComponent(SuggestionHighlightComponent, {injector: this.injector });
  //   // this.highlighter.nativeElement
  //   // this.viewContainer.
  //   // xx.instance.inner = 'aaaaa';
  //   // (this.highlighter.nativeElement as HTMLDivElement).createComponent()
  // }
}
