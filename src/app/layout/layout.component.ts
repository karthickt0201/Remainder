import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent,RouterOutlet],
  template: `
    <app-header class="sticky-top" (sidebarToggle)="toggleSidebar()"></app-header>
    <!-- <app-sidebar [isSidebarOpen]="isSidebarOpen"></app-sidebar> -->
    <!-- [class.expanded]="isSidebarOpen" -->
    <div class="content">
        <router-outlet></router-outlet>
    </div>

  `,
  styles: `  `
})
export class LayoutComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
