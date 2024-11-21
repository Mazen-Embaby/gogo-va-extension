import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  id: any;
  name: string;
  link?: string;
  icon: string;
  isOpen?: boolean;
  children: Array<MenuItem>;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [NgIf, NgFor, RouterLink, MatIconModule, RouterLinkActive, NgClass],
  standalone: true,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit {
  constructor(private _sideBarService: SidebarService) {}
  @ViewChild('sideBarDrawer', { static: false }) sideBarDrawer!: ElementRef;

  navigationMenu: MenuItem[] = [
    {
      id: 1,
      name: 'Chat',
      icon: 'chat',
      link: 'chat',
      isOpen: false,
      children: [],
    },
    {
      id: 2,
      name: 'Write',
      link: 'write',
      icon: 'edit_square',
      children: [],
    },
    {
      id: 3,
      name: 'Trans',
      link: 'translate',
      icon: 'translate',
      isOpen: false,
      children: [],
    },
  ];

  ngAfterViewInit(): void {
    this._sideBarService.setTargetElement(this.sideBarDrawer);
  }
}
