import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body('email') email: string, @Body('password') password: string): {} {
    return this.authService.signUp(email, password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body('email') email: string, @Body('password') password: string): {} {
    return this.authService.signIn(email, password);
  }
}