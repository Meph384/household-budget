import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { BudgetModule } from './budget/budget.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, BudgetModule, PrismaModule]
})
export class AppModule {}
