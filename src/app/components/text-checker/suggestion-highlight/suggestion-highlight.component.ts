import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SuggestionCardComponent } from '../suggestion-card/suggestion-card.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TextCheckerService } from '../text-checker.service';
import SuggestionData from '../type/suggestion-data.interface';
@Component({
  selector: 'app-suggestion-highlight',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    SuggestionCardComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './suggestion-highlight.component.html',
  styleUrl: './suggestion-highlight.component.scss',
})
export class SuggestionHighlightComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  @Input() inner = '';
  @Input() type!: 'none' | 'suggestion';
  @Input() infor!: SuggestionData | null;

  constructor(
    private viewContainer: ViewContainerRef,
    private writeService: TextCheckerService,
  ) {}

  // @HostListener('mouseenter') onMouseEnter() {
  //   console.log('mouseenter..');
  //   this.trigger.toggleMenu();

  // }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('mouseleave..');
    // this.trigger.closeMenu();
  }

  // @HostListener('click') onMC() {
  //   console.log('click..');
  //   this.viewContainer.createComponent(SuggestionCardComponent);
  // }

  @HostListener('blur') onMC() {
    console.log('blur..');
    // this.viewContainer.createComponent(SuggestionCardComponent);
  }

  mouseLeave() {
    console.log('mouseLeave..');
  }

  mouseOver() {
    if (this.infor) {
      console.debug(
        `mouseOver\nmessage:${this.infor.message}\noffset:${this.infor.offset}\nlength:${this.infor.length}\nreplacement:${this.infor.replacements}`,
      );
      this.writeService.selectedSuggestion$.next(this.infor);
      this.trigger.openMenu();
    }
  }
}
