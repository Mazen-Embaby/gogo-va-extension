import { NgClass } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion-highlight',
  standalone: true,
  imports: [NgClass],
  templateUrl: './suggestion-highlight.component.html',
  styleUrl: './suggestion-highlight.component.scss',
})
export class SuggestionHighlightComponent {
  @Input() inner :string= '' ;
  @Input() type!: 'none' | 'suggestion';

  @HostListener('mouseenter') onMouseEnter() {
    console.log('mouseenter..');
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('mouseleave..');

  }

  @HostListener('click') onMC() {
    console.log('click..');

  }

  mouseClick(){
    console.log('mouseClick..');
  }

  mouseOver(){
    console.log('mouseOver..');

  }

}
