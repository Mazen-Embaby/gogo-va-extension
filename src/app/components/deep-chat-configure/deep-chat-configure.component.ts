import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

declare var DeepChat: any;  // Declare DeepChat to avoid TypeScript errors if using a global script

@Component({
  selector: 'app-deep-chat-configure',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './deep-chat-configure.component.html',
  styleUrl: './deep-chat-configure.component.scss'
})
export class DeepChatConfigureComponent  implements OnInit, AfterViewInit {
  
  // Define your configuration options
  chatConfig = {
    appKey: 'your-app-key', // Replace with your actual DeepChat app key
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    theme: {
      color: '#4CAF50', // Custom theme color
      position: 'bottom-right', // Custom position
    },
    customMessage: 'Welcome to our support chat!'
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize any variables you may need
  }

  ngAfterViewInit(): void {
    // Initialize DeepChat after the view is initialized
    this.loadDeepChat();
  }

  loadDeepChat(): void {
    // Assuming `DeepChat` is a global object after the script is loaded
    if (typeof DeepChat !== 'undefined') {
      DeepChat.init(this.chatConfig.appKey); // Initialize with the app key

      // Configure the chat theme and user details
      DeepChat.setUserDetails(this.chatConfig.user);
      DeepChat.setTheme(this.chatConfig.theme);
      DeepChat.setCustomMessage(this.chatConfig.customMessage);

      // You can add more configuration here based on the DeepChat SDK
      DeepChat.startChat();
    } else {
      console.error('DeepChat SDK is not loaded.');
    }
  }

}