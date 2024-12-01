import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import { DatePipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { WritingService } from 'src/app/services/writing.service';
import { Conversation } from 'src/app/types/conversation.interface';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-translation-history',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    DatePipe,
    TruncatePipe,
    MatIconModule,
  ],
  templateUrl: './translation-history.component.html',
  styleUrl: './translation-history.component.scss'
})
export class TranslationHistoryComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<unknown> = new Subject<unknown>();
  conversations: Conversation[] = [];
  filterdConversations: Conversation[] = [];

  @Input() title?: string;

  searchInputControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    private translationService: TranslationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.translationService.conversations$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((val) => {
        this.conversations = Array.from(val.values());
        this.filterdConversations = this.conversations;
      });

    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        map((x: string) => {
          this.filterdConversations = [];
          for (const conv of this.conversations) {
            if (
              conv.messages[0].content.toLowerCase().includes(x.toLowerCase())
            ) {
              this.filterdConversations.push(conv);
            }
          }

          return this.filterdConversations;
        }),
      )
      .subscribe();
  }

  getDate(date: number) {
    return new Date(date);
  }
  selectTranslation(id: string) {
    this.router.navigate([`/translation/details/${id}`]);
  }

  getConversations() {
    return this.filterdConversations;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
