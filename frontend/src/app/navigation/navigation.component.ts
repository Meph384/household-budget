// navigation.component.ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
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
