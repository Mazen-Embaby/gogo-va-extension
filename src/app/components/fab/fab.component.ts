import { Component } from '@angular/core';

@Component({
  selector: 'app-fab',
  standalone: true,
  imports: [],
  templateUrl: './fab.component.html',
  styleUrl: './fab.component.scss',
})
export class FabComponent {
  onFabClick(): void {
    alert('FAB Clicked!');
  }
}
