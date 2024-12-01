import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatMessage } from '../../../types/chat-message.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/dialog/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRipple } from '@angular/material/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Conversation } from '../../../types/conversation.interface';
import { ulid } from 'ulidx';
import { MarkdownSanitizePipe } from 'src/app/pipes/markdown-sanitize.pipe';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { WritingService } from 'src/app/services/writing.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-translation-details',
  standalone: true,
  imports: [
    MatIconModule,
    MatRipple,
    NgClass,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FormsModule,
    RouterLink,
    MarkdownSanitizePipe,
    AsyncPipe,
    MatIconModule,
    TruncatePipe,
    TitleCasePipe
  ],
  templateUrl: './translation-details.component.html',
  styleUrl: './translation-details.component.scss'
})
export class TranslationDetailsComponent  implements OnInit {
  @ViewChild('chatWindow') private chatWindow!: ElementRef;

  form: FormGroup;

  currentStreamMessage?: ChatMessage = undefined;
  currentConversation: Conversation = {
    id: ulid(),
    name: '',
    date: Date.now(),
    messages: [],
    isFav: false,
  };
  isLoading = false;
  text?: string = '';

  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      userInput: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.loadConversation(id);
    } else {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.currentConversation.name = params['topic'];
        this.text = params['text'];

        this.sendChat(this.text!);
      });
    }
    this.isLoading = false; // Set loading to false once the data is fetched
  }

  // Function to load conversation data
  loadConversation(id: string) {
    if (!this.isLoading) {
      this.isLoading = true; // Set loading state
      this.translationService.getConversationById(id).subscribe({
        next: async (res) => {
          if (res) {
            this.currentConversation = res;
          } else {
            console.error('Conversation not found');
          }
        },
        error: (err) => {
          console.error('Error fetching conversation', err);
        },
        complete: () => {
          this.isLoading = false; // Reset loading state after operation
        },
      });
    }
  }

  // Asynchronous function to process and sanitize messages
  async getMessage(content: string): Promise<string> {
    console.log('getMessage');
    this.isLoading = true; // Set loading state while processing
    try {
      const htmlContent = await marked.parse(content); // Parse markdown content
      const sanitizedContent = DOMPurify.sanitize(htmlContent); // Sanitize HTML
      return sanitizedContent; // Return the sanitized content
    } catch (error) {
      console.error('Error processing message content', error);
      return ''; // Return empty content in case of error
    } finally {
      this.isLoading = false; // Reset loading state after processing
    }
  }

  scrollChatWindowToBottom() {
    setTimeout(() => {
      this.chatWindow.nativeElement.scrollTop =
        this.chatWindow.nativeElement.scrollHeight;
    }, 0);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter key press
      this.sendMessage(); // Call submit method when Enter is pressed
    }
  }

  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Snackbar will dismiss after 3 seconds
      verticalPosition: 'top', // 'top' or 'bottom'
      horizontalPosition: 'center', // 'start', 'center', 'end', or 'left'
    });
  }

  openConfirmationDialog(msg: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { header: 'Opps Error occured!', message: msg },
      role: 'alertdialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User confirmed!');
        // Perform the action after confirmation
      } else {
        console.log('User canceled!');
        // Handle cancellation
      }
    });
  }

  sendChat(text: string) {
    this.form.get('userInput')!.setValue(text);
    this.sendMessage();
  }

  async sendMessage() {
    if (this.form.invalid) {
      console.error('Please select the mandatory fields');
      return;
    }
    this.form.disable();
    let isMessagePushed = false;
    const userInput: string = this.form.get('userInput')?.value?.trim();

    const sentMessage: ChatMessage = {
      content: userInput,
      role: 'user',
      avatar: '👤',
      sanitizeHTML: await this.getMessage(userInput),
    };

    this.form.reset();

    try {
      const streamText = await this.translationService.streamText(userInput);
      this.currentConversation.messages.push(sentMessage);
      this.currentConversation.messages.push({
        content: '',
        role: 'assistant',
        avatar: '🤖',
        sanitizeHTML: '',
      });
      isMessagePushed = true;

      for await (const chunk of streamText.values()) {
        // Do something with each chunk
        console.debug(`Stream.. ${chunk}`);

        const sentMessage: ChatMessage = {
          content: chunk,
          role: 'assistant',
          avatar: '🤖',
          sanitizeHTML: await this.getMessage(chunk),
        };
        this.currentConversation.messages[
          this.currentConversation.messages.length - 1
        ] = sentMessage;
        this.scrollChatWindowToBottom();

        // this.currentStreamMessage!.content =
        //   this.currentStreamMessage!.content + chunk;
      }
      this.translationService
        .createConversation(this.currentConversation)
        .subscribe((r) => {});
    } catch (error) {
      // roll-back
      if (isMessagePushed) {
        this.currentConversation.messages.pop();
        this.currentConversation.messages.pop();
      }
      const errorMessage: string =
        error instanceof Error ? error.message : String(error);

      this.showSnackbar(errorMessage);
      // this.scrollMainWindowToBottom(); // subscribe
    }

    this.form.enable();
  }
}
