// app.component.ts
import { Component, OnInit } from "@angular/core";
import { ThemeService } from './services/theme.service';
import { Router, RouterOutlet } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { NavigationComponent } from "./navigation/navigation.component";
import { CategoryService } from "./services/category.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
  imports: [RouterOutlet, NavigationComponent]
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.themeService.initializeTheme(document.body);
    this.categoryService.getAllCategories().subscribe(res => {
      console.log(res);
    });
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
