import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import { Conversation } from '../../types/conversation.interface';
import { DatePipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-history',
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
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.scss',
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<unknown> = new Subject<unknown>();
  conversations: Conversation[] = [];
  filterdConversations: Conversation[] = [];

  @Input() title?: string;

  searchInputControl: UntypedFormControl = new UntypedFormControl();

  constructor(
    private chatService: ChatService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.chatService.conversations$
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
  selectChat(id: string) {
    this.router.navigate([`/chat/${id}`]);
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
