import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [JwtModule.register({}) , PrismaModule]
})
export class AdminModule {}
