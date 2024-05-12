// app.component.ts
import { Component, OnInit } from "@angular/core";
import { ThemeService } from './services/theme.service';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.themeService.initializeTheme(document.body);
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(["/dashboard"]);
      } else {
        this.router.navigate(["/sign-in"]);
      }
    });
  }
}
