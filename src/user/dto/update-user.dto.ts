import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
    role: string;

    @IsString()
    poste: string;

    @IsString()
    departement: string;
}
