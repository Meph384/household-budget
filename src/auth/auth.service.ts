import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signUp(email: string, password: string) {
    try {
      const hash: string = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email: email,
          hash,
        },
      })
      delete(user.hash)
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credentials taken");
        }
      }
      throw error;
    }
  }

  async signIn(email: string, password: string) {
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

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email: email
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get("JWT_SECRET")
    });

    return {
      accessToken: token
    }
  }
}