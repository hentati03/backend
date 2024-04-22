import { Diplome } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class SkillDto {
  @IsString()
  name: string;
}

class DiplomeDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  etablissement: string;

  @IsNotEmpty()
  @IsString()
  dateObtention: string;

  @IsNotEmpty()
  @IsString()
  domaine: string;
}

export class CreateCandidatDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  ville: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  telNum: string;

  @IsString()
  role: string;

  @IsString()
  zip: string;

  @IsString()
  bio: string;

  @IsString()
  image: string;

  @IsArray()
  @Type(() => DiplomeDto)
  diplomes: DiplomeDto[];

  @IsString()
  facebookLink: string;

  @IsString()
  websiteLink: string;

  @IsString()
  linkedInLink: string;

  // @IsArray()
  // @Type(() => CertificatDto)
  // certificats: CertificatDto[];

  @IsString()
  cv: string;

  @IsArray()
  @Type(() => SkillDto)
  skills: SkillDto[];

  @IsBoolean()
  commentairesNotification: boolean;
  @IsBoolean()
  pushAucuneNotification: boolean;
  @IsBoolean()
  pushEmailNotification: boolean;
  @IsBoolean()
  pushToutNotification: boolean;
  @IsBoolean()
  offresNotification: boolean;
}
