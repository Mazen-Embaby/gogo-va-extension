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
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { TextCheckerService } from './text-checker.service';
import { GrammarMockService } from './text-checker.mock.service';
import UtilHelper from '../../utils/util-helper';
import { SuggestionHighlightComponent } from './suggestion-highlight/suggestion-highlight.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import SuggestionData from './types/suggestion-data.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-text-checker',
  standalone: true,
  imports: [SuggestionHighlightComponent, NgStyle],
  templateUrl: './text-checker.component.html',
  styleUrl: './text-checker.component.scss',
})
export class TextCheckerComponent implements AfterViewInit, OnInit, OnDestroy {
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
  @Input() prop = '';

  clonedStyle = new Map<string, string>();
  shadowClone = {};
  text = '';
  private _unsubscribeAll: Subject<unknown> = new Subject<unknown>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private textCheckerService: TextCheckerService,
    private grammarMockService: GrammarMockService,
    private viewContainer: ViewContainerRef,
  ) {
    this.listenForStyles();
  }

  listenForStyles() {
    // Check if the Chrome runtime API is available
    if (window.chrome && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'relayStyles') {
          const data = JSON.parse(message.data);
          const styleMap = new Map<string, string>(Object.entries(data));
          console.log('data!', data);
          console.log('styleMap', styleMap);
          
          // this.clonedStyles = message.data; // Apply the styles to the Angular component
          // console.log('Received styles:', this.clonedStyles);
        }
      });
    } else {
      console.error('Chrome runtime API is not available.');
    }
  }

  ngOnInit(): void {
    this.textElement = (
      this.el.nativeElement as HTMLTextAreaElement
    ).querySelector('textarea')!;

    this.textCheckerService.setSelectedTextChecker(this.textChecker);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.debug('mutation:', mutation);

        if (mutation.attributeName === 'props') {
          const props = JSON.parse(this.el.nativeElement.getAttribute('props'));

          this.clonedStyle = new Map<string, string>(
            Object.entries(JSON.parse(props.clonedStyle)),
          );
          this.text = props.text;

          // this.shadowClone = props.clonedStyle;
          // console.debug('this.shadowClone:', this.shadowClone);
          console.debug('this.clonedStyle:', this.clonedStyle);
          console.debug('this.text:', this.text);

          // (this.textChecker.element.nativeElement as HTMLDivElement).style = UtilHelper.mapStyleToString(this.clonedStyle);

          this.clonedStyle.forEach((value, key) => {
            // (targetElement.style as any)[key] = value;
            console.log(`key::${key}, value::${value}`);
            this.textChecker.element.nativeElement.style.setProperty(
              key,
              value,
            );

            // targetElement.style.setProperty(key, value);
            // targetElement.style['s'] = value;
          });

          this.textCheckerService.textareaValue$.next(this.text);

          // const inputValue = this.textElement.value;
          // console.debug('this.markerPosition:', this.markerPosition );
          // console.debug('XX', xx );
          // this.markerStyle = {
          //   ...xx,
          //   // display: `${xx['display']}`,
          //   // left: `${xx['left']}px`,
          //   // top: `${xx['top']}px`,
          // };
        }
      });
    });

    //  observer.observe(this.el.nativeElement, { attributes: true, attributeFilter: ['style'] });

    observer.observe(this.el.nativeElement, { attributes: true });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  write() {
    this.textElement.value = 'text changed';
  }

  ngAfterViewInit(): void {
    this.textCheckerService.textareaValue$
      .pipe(
        takeUntil(this._unsubscribeAll),
        distinctUntilChanged((prev, curr) => {
          return prev == curr;
        }),
      )
      .subscribe((v) => {
        if (this.textElement.value != v) {
          console.debug('CHANGE TEXTAREA');
          this.textElement.value = v;
        }
        this.checkText(v);
      });

    (this.textChecker.element.nativeElement as HTMLDivElement).addEventListener(
      'input',
      () => {
        const input = (this.textChecker.element.nativeElement as HTMLDivElement)
          .innerText;
        console.debug('chnage text0checker div ', input);
        this.textCheckerService.textareaValue$.next(input);
      },
    );
    // const x = (this.divRef.nativeElement as HTMLDivElement).previousSibling;
    // console.log('ana next sibling', x);
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

  async checkText(text: string) {
    console.log(`Send Text ${text}`);
    const issues = await this.textCheckerService.checkMistakes(text);
    console.debug('Issues :', issues);

    let parsedJson;
    try {
      parsedJson = JSON.parse(issues);
    } catch (e) {
      console.error('Error parsing: ', e);
    }
    console.debug('Parsed issues :', parsedJson);

    console.debug('Parsed issues.matches :', parsedJson.matches);
    await this.updateUI(text, parsedJson.matches);
  }

  updateUI(fullText: string, issues: SuggestionData[]) {
    // Remove all suggestion | text
    (this.textChecker.element.nativeElement as HTMLDivElement).innerHTML = '';

    const itemIdx = 0;
    this.counterComponents = 0;
    if (!issues) return this.textCheckerService.escapeHtml(fullText);

    const resultText = '';
    let lastIndex = 0;

    issues.forEach((issue) => {
      const { start, end } = issue;

      console.log(`LIDX: ${lastIndex}`);
      if (lastIndex != start) {
        this.createNewComponent(
          this.textCheckerService.escapeHtml(fullText.slice(lastIndex, start)),
          null,
        );
        // resultText += `<span>${this.writeService.escapeHtml(fullText.slice(lastIndex, start))}</span>`;
        lastIndex = start;
        console.log(`LIDX: ${lastIndex}`);

        this.createNewComponent(
          this.textCheckerService.escapeHtml(fullText.slice(lastIndex, end)),
          issue,
        );
        // resultText += `<span class="highlight">${this.writeService.escapeHtml(fullText.slice(lastIndex, end))}</span>`;
        lastIndex = end;
        console.log(`LIDX: ${lastIndex}`);
      } else {
        this.createNewComponent(
          this.textCheckerService.escapeHtml(
            fullText.slice(lastIndex, lastIndex + (end - start)),
          ),
          issue,
        );
        // resultText += `<span class="highlight">${this.writeService.escapeHtml(fullText.slice(lastIndex, lastIndex + length))}</span>`;
        lastIndex += end - start;
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

    // this.textChecker.element.nativeElement = UtilHelper.applyStyles(this.textChecker.element.nativeElement, this.clonedStyle);
    // this.textChecker.element.nativeElement.styleMap = this.clonedStyle;
    // UtilHelper.cloneTextareaStyle
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
