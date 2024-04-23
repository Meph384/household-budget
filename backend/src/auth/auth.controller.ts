import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
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
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response
  ) {
    this.authService.signIn(email, password)
      .then(accessToken => {
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });
        res.status(200).json({ message: 'Sign in successful!' });
      })
      .catch(error => {
        res.status(401).json({ message: 'Authentication failed', reason: error.message });
      });
  }
}