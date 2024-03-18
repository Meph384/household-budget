import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(email: string, password: string) {
    try {
      const hash: string = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email: email,
          hash,
        },
      })
      delete(user.hash)
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials taken");
        }
      }
      throw error;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
    });

    if (!user) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const pwMatches: boolean = await argon.verify(user.hash, password);

    if (!pwMatches) {
      throw new ForbiddenException("Credentials incorrect");
    }
    delete user.hash;
    return user;
  }
}