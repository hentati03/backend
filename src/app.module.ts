import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { CandidatModule } from './candidat/candidat.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    CandidatModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
