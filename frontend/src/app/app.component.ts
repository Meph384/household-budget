// app.component.ts
import { Component, OnInit } from "@angular/core";
import { ThemeService } from './services/theme.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService, private router: Router) {}

  ngOnInit(): void {
    this.themeService.initializeTheme(document.body);
    this.router.navigate(["/sign-in"]);
  }
}
