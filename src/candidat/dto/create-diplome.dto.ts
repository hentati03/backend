import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiplomeDto {
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

  @IsNotEmpty()
  @IsString()
  parentId: string;
}
