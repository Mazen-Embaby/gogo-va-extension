import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-writing-assistance',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './writing-assistance.component.html',
  styleUrl: './writing-assistance.component.scss'
})
export class WritingAssistanceComponent implements OnChanges, OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  
    @Input() markerPosition: { left: number; top: number } = {
      left: 0,
      top: 0
    };
    highlightColor = 'rgb(213, 234, 255)';
    markerStyle  = {
      display: 'none',
      left: '0',
      top: '0',
    };
  

    ngOnInit(): void {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'markerposition') {
            const xx = JSON.parse(this.el.nativeElement.getAttribute('markerposition'));
            console.debug('this.markerPosition:', this.markerPosition ); 
            console.debug('XX', xx ); 
            this.markerStyle = {
              ...xx,
              // left: '0px',
              // top: '0px',
              // display: `${xx['display']}`,
              // left: `${xx['left']}px`,
              // top: `${xx['top']}px`,
            };
          }
        });
      });
  
      observer.observe(this.el.nativeElement, { attributes: true });
    }

    // doesn't work from outside
    ngOnChanges(changes: SimpleChanges): void {
      console.log('Changes');
      if (changes['markerPosition']) {
        const { left = 0, top = 0 } = this.markerPosition;
        this.markerStyle = {
          ...this.markerStyle,
          display: 'block',
          left: `${left}px`,
          top: `${top}px`,
        };
      }
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