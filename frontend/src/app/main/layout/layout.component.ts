import { Component, inject, Signal } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { map, shareReplay } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbar,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatIcon,
    MatButton,
    MatIconButton,
    NavbarComponent,
    SidebarComponent
  ]
})
export class LayoutComponent {
  #breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  isMobile: Signal<boolean | undefined> = toSignal(
    this.#breakpointObserver.observe('(max-width: 768px)').pipe(
      map((result: BreakpointState) => result.matches),
      shareReplay()
    )
  );
}
