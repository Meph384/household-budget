import { Component, inject } from '@angular/core';
import { MatNavList, MatListItem } from '@angular/material/list';
import { SIDEBAR_LINKS, SidebarLink } from './sidebar-options';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { QuicklinkDirective } from 'ngx-quicklink';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.scss',
  imports: [MatNavList, MatListItem, RouterLink, RouterLinkActive, QuicklinkDirective]
})
export class SidebarComponent {
  #sidenav: MatSidenav = inject(MatSidenav);
  sidebarLinks: SidebarLink[] = SIDEBAR_LINKS;

  closeSidenav(): void {
    if (this.#sidenav.mode === 'over') {
      this.#sidenav.close();
    }
  }
}
