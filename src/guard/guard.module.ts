import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [AuthGuard],
  controllers: [],
  exports: [AuthGuard],
})
export class GuardModule {}
