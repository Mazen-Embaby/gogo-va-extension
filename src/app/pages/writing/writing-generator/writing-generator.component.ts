import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WritingService } from 'src/app/services/writing.service';

@Component({
  selector: 'app-writing-generator',
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
  templateUrl: './writing-generator.component.html',
  styleUrl: './writing-generator.component.scss'
})
export class WritingGeneratorComponent {
  @ViewChild('writeWindow') private writeWindow!: ElementRef;
  form: FormGroup;

  formatChips: string[] = ['Paragraph', 'Email', 'Comment', 'Message'];
  selectedFormatChip: string = this.formatChips[0];

  toneChips: string[] = ['Formal', 'Funny', 'Professional'];
  selectedToneChip: string = this.toneChips[0];

  lengthChips: string[] = ['Short', 'Medium', 'Long'];
  selectedLengthChip: string = this.lengthChips[0];

  messages: ChatMessage[] = [];
  userInput = '';

  selectFormatChip(chip: string): void {
    this.selectedFormatChip = chip;
  }
  selectToneChip(chip: string): void {
    this.selectedToneChip = chip;
  }
  selectLengthChip(chip: string): void {
    this.selectedLengthChip = chip;
  }
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.form = this.fb.group({
      userInput: [null, Validators.required],
    });
  }

  scrollChatWindowToBottom() {
    setTimeout(() => {
      this.writeWindow.nativeElement.scrollTop =
        this.writeWindow.nativeElement.scrollHeight;
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
    if (this.form.invalid)
     {
      console.error('Please select the mandatory fields');
      return;
    }
    
    const isMessagePushed = false;

    const topic = this.form.get('userInput')?.value?.trim();
    const format = this.selectedFormatChip;
    const tone = this.selectedToneChip;
    const length = this.selectedLengthChip;
    const prompt = this.writeTemplate(topic, format!, tone!, length!);

    this.router.navigate(['/writing/details'], { queryParams: { prompt: prompt, name: topic } });

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
