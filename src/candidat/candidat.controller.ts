import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { CreateDiplomeDto } from './dto/create-diplome.dto';

@Controller('candidat')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) {}

  @Post('add-candidat')
  createCandidat(@Body() dto: CreateCandidatDto) {
    return this.candidatService.createCandidat(dto);
  }
}
