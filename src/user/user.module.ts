import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [JwtModule.register({}) , PrismaModule]
})
export class UserModule {}
