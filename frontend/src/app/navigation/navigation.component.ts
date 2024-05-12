// navigation.component.ts
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, RouterLink, MatSlideToggleModule, ReactiveFormsModule]
})
export class NavigationComponent {
  switchTheme = new FormControl(false);

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.switchTheme.valueChanges.subscribe((_) => {
      this.themeService.toggleTheme(document.body);
    });
  }
}
