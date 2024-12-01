import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TextCheckerService } from '../text-checker.service';
import SuggestionData from '../types/suggestion-data.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-suggestion-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './suggestion-card.component.html',
  styleUrl: './suggestion-card.component.scss',
})
export class SuggestionCardComponent implements OnInit, OnDestroy {
  @Input() message!: string;
  @Input() error!: string;
  @Input() correct!: string;
  info?: SuggestionData;
  private _unsubscribeAll: Subject<unknown> = new Subject<unknown>();

  constructor(private textCheckerService: TextCheckerService) {}

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.textCheckerService.selectedSuggestion$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((val) => {
        this.info = val;
      });
  }

  getImg(asset: string) {
    // console.log(chrome.runtime);
    // const x = chrome.runtime.getURL(asset);
    // return x;
  }
  getOldVal() {
    if (this.info) {
      return this.info?.replacements!.oldValue;
    } else {
      return '';
    }
  }

  getNewVal() {
    if (this.info) {
      return this.info?.replacements!.newValue;
    } else {
      return '';
    }
  }

  doCorrection() {
    // console.log('Do correction...');
    // this.getImg('app/assets/images/icon48.png');
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
