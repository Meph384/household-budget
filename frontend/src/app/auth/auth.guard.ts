import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private readonly authService: AuthService,
              private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    )
  }
}
