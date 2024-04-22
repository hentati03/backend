import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { CreateRecruteurDto } from './create-recruteur.dto';

export class UpdateRecruteurDto extends PartialType(CreateRecruteurDto) {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsNotEmpty()
    @IsString()
    location: string;
  
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
    telNum : string;

    @IsString()
    poste: string;

    @IsString()
    departement: string;

    image : string;
}

// just like the update user dto but without the role