import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChromeStorageService } from 'src/app/services/chrome-storage.service';
import { WritingService } from 'src/app/services/writing.service';
import 'deep-chat';
import { checkMistakesAgent as textAnalysisAgent } from 'src/app/ai-agent';




@Component({
  selector: 'app-writing-assistance',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf, NgFor],
  templateUrl: './writing-assistance.component.html',
  styleUrl: './writing-assistance.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class WritingAssistanceComponent implements OnChanges, OnInit {
  private storageSubscription?: Subscription;

  history = [
    { role: 'user', text: 'Hey, how are you today?' },
    { role: 'ai', text: 'I am doing very well!' },
  ];

  constructor(private el: ElementRef, private renderer: Renderer2, private writingService: WritingService, private chromeStorageService: ChromeStorageService ) {}

  // @ViewChild('tabs') private tabs!: ElementRef;
  suggestion: {message:string}[] = [];
  languageTone : {formal: number, friendly?: number, simple?: number, clear?:number }= { formal:0, friendly: 0, clear: 0, simple: 0 };
  activeTab: string = 'tab1';  // Set default active tab
  tabs = [
    { name: 'tab1', label: '💡 Sug', content: 'Content for Tab 1' },
    { name: 'tab2', label: '🤔 Tone', content: 'Content for Tab 2' },
    { name: 'tab3', label: '🤖 Chat', content: 'Content for Tab 3' },

  ];

    @Input() markerPosition: { left: number; top: number } = {
      left: 0,
      top: 0
    };
    highlightColor = 'rgb(213, 234, 255)';
    markerStyle  = {
      display: 'none',
      right: '0',
      bottom: '0',
    };

    apply(){
      console.log('last: ', 'apply');
      chrome.runtime.sendMessage({
        action: 'updateLastActiveInput',
        attribute: 'style',
        value: 'background-color: yellow;'
      });

    }

    toggleMenu(){
      if (this.markerStyle.display === 'none'){
        this.markerStyle = {display: 'block', right: '0px', bottom: '0px'};
      }
      else {
        this.markerStyle = {display: 'none', right: '0px', bottom: '0px'};
      }
    }

    ngOnInit(): void {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(async (mutation) => {
          if (mutation.attributeName === 'markerposition') {
            const xx = JSON.parse(this.el.nativeElement.getAttribute('markerposition'));
            console.debug('XX', xx ); 

            this.markerStyle = {
              ...xx,
              // left: '0px',
              // top: '0px',
              // display: `${xx['display']}`,
              // left: `${xx['left']}px`,
              // top: `${xx['top']}px`,
            };

            const prompt = textAnalysisAgent(xx.text);
            
            const issues = await this.writingService.promptText(prompt);


            console.debug('Issues :', issues);

            let parsedJson;
            try {
              parsedJson = JSON.parse(issues);
            } catch (e) {
              console.error('Error parsing: ', e);
            }
            console.debug('Parsed issues :', parsedJson);
        
            await this.updateUI(parsedJson);

          }
        });
      });
        
      observer.observe(this.el.nativeElement, { attributes: true });
  
  
      // Subscribe to storage changes
      this.storageSubscription = this.chromeStorageService.getStorageChanges().subscribe((changes) => {
        console.log('Chrome storage changed:', changes);
        // Handle the changes here, for example, update component state or trigger actions
      });
  
    }

    updateUI(parsedJson:any){
      this.suggestion = parsedJson.suggestion;
      this.languageTone = parsedJson.languageTone;
      console.log('AAA', this.languageTone.formal);
    }

    // doesn't work from outside
    ngOnChanges(changes: SimpleChanges): void {
      console.log('Changes');
      if (changes['markerPosition']) {
        const { left = 0, top = 0 } = this.markerPosition;
        this.markerStyle = {
          ...this.markerStyle,
          display: 'block',
          right: `${left}px`,
          bottom: `${top}px`,
        };
      }
    }

    openCity(event: Event, cityName: string): void {
      this.activeTab = cityName; // Update the active tab based on the clicked button
    }
  
    highlightSelection(): void {
      const userSelection = window.getSelection();
      if (!userSelection) return;
  
      for (let i = 0; i < userSelection.rangeCount; i++) {
        this.highlightRange(userSelection.getRangeAt(i));
      }
  
      window.getSelection()?.empty();
    }
  
    highlightRange(range: Range): void {
      const span = document.createElement('span');
      span.style.backgroundColor = this.highlightColor;
      span.style.display = 'inline';
      span.appendChild(range.extractContents());
      range.insertNode(span);
    }


  }