import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() dto: LoginUserDto){
    return this.userService.loginUser(dto)
  }


}
