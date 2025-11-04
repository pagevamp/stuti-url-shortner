import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HashService } from './hash.service';
import { GuardModule } from 'guard/guard.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GuardModule, JwtModule, ConfigModule],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService, HashService],
})
export class UserModule {}
