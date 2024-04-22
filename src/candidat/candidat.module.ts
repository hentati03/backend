import { Module } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [CandidatController],
  providers: [CandidatService],
  imports: [JwtModule.register({}), PrismaModule],
})
export class CandidatModule {}
