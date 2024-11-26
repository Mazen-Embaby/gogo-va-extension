import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TextCheckerService } from '../text-checker.service';
import SuggestionData from '../type/suggestion-data.interface';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom

})
export class SuggestionCardComponent implements OnInit{
  @Input() message!: string;
  @Input() error!: string;
  @Input() correct!: string;
  info?: SuggestionData;

  constructor(private textCheckerService: TextCheckerService) {}

  ngOnInit(): void {
    this.textCheckerService.selectedSuggestion$.subscribe((val)=>{
      this.info = val;
    })
  }

  getImg(asset: string){
    console.log(chrome.runtime.id);

    const x = chrome.runtime.getURL(asset);
    return x;
  }
  getOldVal(){
    if (this.info) {
      return this.info?.replacements![0].old;
    }
    else{
      return '';
    }
  }

  getNewVal(){
    if (this.info) {
      return this.info?.replacements![0].new;
    }
    else{
      return '';
    }
  }

  doCorrection() {
    console.log('Do correction...');
    this.getImg('app/assets/images/icon48.png');
    this.textCheckerService.changeToCurrentSuggestion().subscribe();
    // this.textCheckerService.selectedSuggestion$.subscribe((v) => {
    //   this.textCheckerService.textareaValue$.next(v);
    // });

    // this.textCheckerService.changeText({
    //   // componentIdx: 1,
    //   start: 10,
    //   end: 16,

    //   // wrongText: 'mistak',
    //   // correctText: 'mistake',
    // }).subscribe((w)=>{
    //   this.textCheckerService.textareaValue$.next(
    //     w
    //   );
    //   console.log(`What's going on .. ${w}`);
    // });
  }
}
