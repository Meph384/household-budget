import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body('email') email: string, @Body('password') password: string): {} {
    return this.authService.signup(email, password);
  }
  @Post('signin')
  signin(@Body('email') email: string, @Body('password') password: string): {} {
    return this.authService.signin(email, password);
  }
}