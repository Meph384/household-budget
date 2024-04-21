import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator/user.decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get()
  getMe(@GetUser() user: User) {
    return user;
  }
}
