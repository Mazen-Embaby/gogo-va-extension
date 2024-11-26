import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ChatService } from '../../services/chat.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatMessage } from '../../types/message.interface';
import { DeepChat } from 'deep-chat';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/dialog/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// import type { ReadableStream } from 'node:stream/web';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatIconModule,
    NgClass,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FormsModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @ViewChild('chatWindow') private chatWindow!: ElementRef;

  form: FormGroup;

  // userInput: string = '';
  // currentStreamMessage = new ReplaySubject<String>(1); // Buffer of 1 for real-time updates
  currentStreamMessage?: ChatMessage = undefined;

  messages: ChatMessage[] = [
    // {
    //   content: 'Who are you!',
    //   role: 'user',
    // },
    // {
    //   content: 'I am the helpful assistance. ',
    //   role: 'system'
    // }
  ];

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      userInput: ['', Validators.required],
    });
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

  async sendMessage() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    let isMessagePushed = false;
    const userInput: string = this.form.get('userInput')?.value.trim();

    const sentMessage: ChatMessage = {
      content: userInput,
      role: 'user',
    };

    this.form.reset();

    try {
      const streamText = await this.chatService.streamText(userInput);
      // const streamText = this.chatMockService.mockAIResponse(this.userInput); // test purpose
      // const aiResponse$ = from(streamText);
      this.messages.push(sentMessage);
      this.messages.push({
        content: '',
        role: 'assistant',
        avatar: '🤖',
      });
      isMessagePushed = true;

      for await (const chunk of streamText.values()) {
        // Do something with each chunk
        console.debug(`Stream.. ${chunk}`);

        const sentMessage: ChatMessage = {
          content: chunk,
          role: 'assistant',
          avatar: '🤖',
        };
        this.messages[this.messages.length - 1] = sentMessage;
        this.scrollChatWindowToBottom();

        // this.currentStreamMessage!.content =
        //   this.currentStreamMessage!.content + chunk;
      }
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

    this.form.enable();

    // this.messages.push(sentMessage);

    // this.userInput = '';

    // this.currentStreamMessage = {
    //   content: '',
    //   role: 'assistant',
    //   avatar: '',
    // };
    // aiResponse$
    //   .pipe(
    //     finalize(
    //       () => {
    //         console.debug('Stream Finalize complete');
    //         this.userInput = '';
    //         this.currentStreamMessage = undefined;
    //       }, // Execute when the observable completes
    //     ),
    //   )
    //   .subscribe({
    //     next: async (aiText) => {
    //         for await (const chunk of aiText) {
    //           console.debug('Stream..');
    //           this.currentStreamMessage!.content =
    //           this.currentStreamMessage!.content + chunk;
    //       }

    //       console.debug('AI stream complete');
    //       this.messages.push(this.currentStreamMessage!);
    //       this.currentStreamMessage = undefined;
    //     },
    //     error: (err) => {
    //       const lastMessage = this.messages.pop();
    //       console.error('Error:', err);
    //     },
    //     complete: () => {

    //     },
    //   });

    // aiResponse$.subscribe((aiText) => {

    //   const receivedMessage: ChatMessage = {
    //     content: aiText,
    //     role: 'system',
    //     avatar:
    //       'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=144&h=144',
    //   };
    //   this.messages.push(receivedMessage);
    // });

    // this.output = await this.chatService.promptText(userMessage.text);

    // const agentMessage = {
    //   text: this.output,
    //   sentByUser: false,
    //   profileImage:
    //     'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=144&h=144',
    // };
    // this.messages.push(agentMessage);
    // this.userInput = ''; // Clear the input field
  }
}
