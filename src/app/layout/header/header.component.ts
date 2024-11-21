import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

import { NavigationRoute } from './navigation.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
})


export class HeaderComponent implements AfterViewInit {


  constructor(private sideBarService: SidebarService) { }


  @ViewChild("navBarBtn", { static: false }) navBarBtn!: ElementRef;
  @ViewChild("navBarDropdown", { static: false }) navBarDropdown!: ElementRef;


  navigation: NavigationRoute[] = [
    { name: 'Admin', link: '/admin' },
    { name: 'Ecommerce', link: '/admin/app/ecommerce' },
    { name: 'Projects', link: '/admin/app/ticket' },
    { name: 'Reports', link: '/report' },
  ];



  ngAfterViewInit(): void {


  }


 


}
