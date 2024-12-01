import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatService } from '../../../services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../components/dialog/confirmation-dialog/confirmation-dialog.component';
import { ChatMessage } from '../../../types/chat-message.interface';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SummaryService } from 'src/app/services/summary.service';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface PropVal {
  title: string;
  value: string;
}

@Component({
  selector: 'app-summary-generator',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatRipple,
    MatChipsModule,
    MatIconModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './summary-generator.component.html',
  styleUrl: './summary-generator.component.scss',
})
export class SummaryGeneratorComponent {
  @ViewChild('summaryWindow') private summaryWindow!: ElementRef;
  form: FormGroup;

  formatChips: PropVal[] = [
    {
      title: 'MarkDown',
      value: 'markdown',
    },
    {
      title: 'Plain Text',
      value: 'plain-text',
    },
  ];
  selectedFormatChip: PropVal = this.formatChips[0];

  summaryChips: PropVal[] = [
    {
      title: 'KeyPoints',
      value: 'key-points',
    },
    {
      title: 'tl;dr',
      value: 'tl;dr',
    },
    {
      title: 'Teaser',
      value: 'teaser',
    },
    {
      title: 'Headline',
      value: 'headline',
    },
  ];
  selectedSummaryChip: PropVal = this.summaryChips[0];

  lengthChips: PropVal[] = [
    {
      title: 'Short',
      value: 'short',
    },
    {
      title: 'Medium',
      value: 'medium',
    },
    {
      title: 'Long',
      value: 'long',
    },
  ];
  selectedLengthChip: PropVal = this.lengthChips[0];

  messages: ChatMessage[] = [];

  summarizedText = '';

  selectFormatChip(chip: PropVal): void {
    this.selectedFormatChip = chip;
    this.sendMessage();
  }
  selectSummaryChip(chip: PropVal): void {
    this.selectedSummaryChip = chip;
    this.sendMessage();
  }
  selectLengthChip(chip: PropVal): void {
    this.selectedLengthChip = chip;
    this.sendMessage();
  }
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private summaryService: SummaryService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      userInput: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
    } else {
      this.activatedRoute.queryParams.subscribe((params) => {
        const text = params['text'];
        if (text) {
          this.form.get('userInput')!.setValue(text);
          this.sendMessage();
        }
      });
    }
  }

  scrollChatWindowToBottom() {
    setTimeout(() => {
      this.summaryWindow.nativeElement.scrollTop =
        this.summaryWindow.nativeElement.scrollHeight;
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

  async sendMessage() {
    if (this.form.invalid) {
      console.error('Please select the mandatory fields');
      return;
    }

    const isMessagePushed = false;

    const input = this.form.get('userInput')?.value?.trim();
    const summaryType = this.selectedSummaryChip;
    const format = this.selectedFormatChip;
    const length = this.selectedLengthChip;
    console.log(`type:${summaryType}\nformat:${format}\nlength${length}`);

    try {
      const stream = await this.summaryService.streamSummary(input, {
        type: summaryType.value,
        format: format.value,
        length: length.value,
        sharedContext: '',
      });

      this.summarizedText = '';
      let previousLength = 0;
      for await (const segment of stream) {
        const markdown = await marked.parse(segment); // Parse markdown content
        this.summarizedText = DOMPurify.sanitize(markdown); // Sanitize HTML
      }
      console.log(this.summarizedText);
    } catch (error) {
      // roll-back
      if (isMessagePushed) {
        this.messages.pop();
        this.messages.pop();
      }
      const errorMessage: string =
        error instanceof Error ? error.message : String(error);

      this.showSnackbar(errorMessage);
      // this.scrollMainWindowToBottom(); // subscribe
    }

    // this.router.navigate(['/summary/details'], { queryParams: { prompt: prompt, name: topic } });

    // const sentMessage: ChatMessage = {
    //   content: text,
    //   role: 'user',
    // };

    // this.form.reset();

    // try {
    //   const streamText = await this.chatService.streamText(text);
    //   this.messages.push(sentMessage);
    //   this.messages.push({
    //     content: '',
    //     role: 'assistant',
    //     avatar: '🤖',
    //     sanitizeHTML
    //   });
    //   isMessagePushed = true;

    //   for await (const chunk of streamText.values()) {
    //     // Do something with each chunk
    //     console.debug(`Stream.. ${chunk}`);

    //     const sentMessage: ChatMessage = {
    //       content: chunk,
    //       role: 'assistant',
    //       avatar: '🤖',
    //     };
    //     this.messages[this.messages.length - 1] = sentMessage;
    //     this.scrollChatWindowToBottom();

    //     // this.currentStreamMessage!.content =
    //     //   this.currentStreamMessage!.content + chunk;
    //   }
    // } catch (error) {
    //   // roll-back
    //   if (isMessagePushed) {
    //     this.messages.pop();
    //     this.messages.pop();
    //   }
    //   const errorMessage: string =
    //     error instanceof Error ? error.message : String(error);

    //   this.showSnackbar(errorMessage);
    //   // this.scrollMainWindowToBottom(); // subscribe
    // }

    // this.form.enable();
  }

  writeTemplate(
    topic: string,
    format: string,
    tone: string,
    length: string,
  ): string {
    return `Write a topic about '${topic}' formated as '${format}' with tone '${tone}' and it length '${length}'`;
  }
}
