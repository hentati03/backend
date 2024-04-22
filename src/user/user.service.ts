import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';



@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // _______ Create a New User ___________

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await argon.hash(dto.password)
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          image: null,
          hashedPassword,
          firstName : dto.firstName,
          lastName : dto.lastName,
          userName : dto.userName,
          location : dto.location,
          telNum : dto.telNum,
          role : dto.role,
        },

      });
      console.log({
        user : user
      })
      return {
        user : user
      }
    } catch (error){
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }


    // _______ Generate a Token ___________

    async signToken(userId : string , email : string , role : string): Promise<{access_token : string}>{
      const payload = {
        sub: userId,
        email,
        role
      };
      const secret = this.config.get('JWT_SECRET');
  
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '3 h',
        secret: secret,
      });
      //console.log(payload)
      return {
        access_token: token,
      };
      
    }

    // _______ Login a User ___________


    async loginUser(dto: LoginUserDto) {
      // find the candidat by email
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      // if user does not exist throw exception
      if (!user) throw new ForbiddenException('Credentials incorrect');
  
      // compare password
      const pwMatches = await argon.verify(user.hashedPassword, dto.password);
      // if password incorrect throw exception
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
      return this.signToken(user.id, user.email, user.role);
    }


}
