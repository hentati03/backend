import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateRecruteurDto } from './dto/update-recruteur.dto';
import { CreateRecruteurDto } from './dto/create-recruteur.dto';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ___________ Create a Recruteur ___________

  async createRecruteur(dto: CreateRecruteurDto) {
    const hashedPassword = await argon.hash(dto.password);
    try {
      // Create recruteur
      const recruteur = await this.prisma.recruteur.create({
        data: {
          email: dto.email,
          image: dto.image,
          hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          userName: dto.userName,
          location: dto.location,
          telNum: dto.telNum,
          role: 'recruteur',
          poste: dto.poste,
          departement: dto.departement,
        },
      });

      // Create user with the same data as recruteur
      const user = await this.prisma.user.create({
        data: {
          id: recruteur.id, // Use the same id for both recruteur and user
          createdAt: recruteur.createdAt,
          updatedAt: recruteur.updatedAt,
          email: recruteur.email,
          hashedPassword: recruteur.hashedPassword,
          image: recruteur.image,
          firstName: recruteur.firstName,
          lastName: recruteur.lastName,
          userName: recruteur.userName,
          location: recruteur.location,
          telNum: recruteur.telNum,
          role: recruteur.role,
        },
      });

      return { recruteur, user }; // Return both recruteur and user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  // ___________ Update Recruteur___________

  async updateRecruteur(id: string, dto: UpdateRecruteurDto) {
    try {
      // Check if the recruteur with the given id exists
      const existingRecruteur = await this.prisma.recruteur.findUnique({
        where: { id },
      });

      // If recruteur doesn't exist, throw an exception
      if (!existingRecruteur) {
        throw new NotFoundException('Recruteur not found');
      }

      // If password is provided in the DTO, hash it
      let hash;
      if (dto.password) {
        hash = await argon.hash(dto.password);
      }

      // Update recruteur with the provided data
      const updatedRecruteur = await this.prisma.recruteur.update({
        where: { id },
        data: {
          image: dto.image || existingRecruteur.image,
          email: dto.email || existingRecruteur.email,
          hashedPassword: hash || existingRecruteur.hashedPassword,
          location: dto.location || existingRecruteur.location,
          firstName: dto.firstName || existingRecruteur.firstName,
          lastName: dto.lastName || existingRecruteur.lastName,
          userName: dto.userName || existingRecruteur.userName,
          telNum: dto.telNum || existingRecruteur.telNum,
          poste: dto.poste || existingRecruteur.poste,
          departement: dto.departement || existingRecruteur.departement,
        },
      });

      // Update corresponding user with the same data
      const updatedUser = await this.prisma.user.update({
        where: { id: existingRecruteur.id }, // Use the same id for both recruteur and user
        data: {
          image: updatedRecruteur.image,
          email: updatedRecruteur.email,
          hashedPassword: updatedRecruteur.hashedPassword,
          location: updatedRecruteur.location,
          firstName: updatedRecruteur.firstName,
          lastName: updatedRecruteur.lastName,
          userName: updatedRecruteur.userName,
          telNum: updatedRecruteur.telNum,
          updatedAt: existingRecruteur.updatedAt,
        },
      });
      console.log(updatedRecruteur);
      return { recruteur: updatedRecruteur, user: updatedUser };
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  // ___________ Get All Recruteurs ___________
  async getAllRecruteurs() {
    try {
      const recruteurs = await this.prisma.recruteur.findMany({});
      return recruteurs;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  //___________ Get a Recruteur By Id ___________

  async getRecruteurById(id: string) {
    try {
      const recruteur = await this.prisma.recruteur.findUnique({
        where: {
          id,
        },
      });
      if (!recruteur) {
        throw new NotFoundException('Recruteur not found');
      }
      return recruteur;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  // ___________ Delete a Recruteur By Id ___________
  async deleteRecruteur(id: string) {
    try {
      // Check if the recruteur exists and is a Recruteur
      const recruteur = await this.prisma.recruteur.findUnique({
        where: {
          id,
        },
      });
      if (!recruteur) {
        throw new NotFoundException('Recruteur not found');
      }

      // Find the corresponding user entry
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      // Delete both the Recruteur and user
      const deletedRecruteur = await this.prisma.recruteur.delete({
        where: { id },
      });

      if (user) {
        await this.prisma.user.delete({
          where: { id },
        });
      }

      return deletedRecruteur;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  // ___________ Get All Candidats ___________
  async getAllCandidats() {
    try {
      const candidats = await this.prisma.user.findMany({
        where: {
          role: 'candidat',
        },
      });
      return candidats;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  //___________ Get a Candidat By Id ___________

  async getCandidatById(id: string) {
    try {
      const candidat = await this.prisma.user.findUnique({
        where: {
          id,
          role: 'candidat',
        },
      });
      if (!candidat) {
        throw new NotFoundException('candidat not found');
      }
      return candidat;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  // ___________ Delete a Candidat By Id ___________
  async deleteCandidat(id: string) {
    try {
      // Check if the user exists and is a Candidat
      const candidat = await this.prisma.user.findUnique({
        where: {
          id,
          role: 'candidat',
        },
      });
      if (!candidat) {
        throw new NotFoundException('Candidat not found');
      }

      // Delete the Candidat
      const deletedCandidat = await this.prisma.user.delete({
        where: { id },
      });

      return deletedCandidat;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
}
