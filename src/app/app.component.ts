import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
})
export class AppComponent  {
  title = 'gogo-va';
  @ViewChild('mainWindow') private mainWindow!: ElementRef;

  scrollMainWindowToBottom() {
    setTimeout(() => {
      this.mainWindow.nativeElement.scrollTop =
        this.mainWindow.nativeElement.scrollHeight;
    }, 0);
  }
}
