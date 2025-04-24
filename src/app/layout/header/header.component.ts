import { Component, EventEmitter, Output, inject } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  isSidebarOpen : boolean = false
  router = inject(Router);

  toggleSidebar() {
    this.sidebarToggle.emit();
    this.isSidebarOpen = !this.isSidebarOpen;
  }
 
  logNavigation(routeName: string) {
   this.router.navigate([routeName]);
  }

  openGitHub() {
    window.open('https://github.com/ISDavidraj/Angular.git', '_blank');
  }
}
