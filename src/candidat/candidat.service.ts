import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async createCandidat(dto: CreateCandidatDto) {
    const hashedPassword = await argon.hash(dto.password);
    try {
      // Création du candidat
      const candidat = await this.prisma.candidat.create({
        data: {
          email: dto.email,
          hashedPassword,
          bio: dto.bio,
          image: dto.image,
          firstName: dto.firstName,
          lastName: dto.lastName,
          userName: dto.userName,
          ville: dto.ville,
          address: dto.address,
          zip: dto.zip,
          telNum: dto.telNum,
          role: 'candidat',
          diplomes: {
            createMany: {
              data: dto.diplomes.map((diplome) => ({
                titre: diplome.titre,
                etablissement: diplome.etablissement,
                dateObtention: diplome.dateObtention,
                domaine: diplome.domaine,
              })),
            },
          },
          // certificats: {
          //   createMany: {
          //     data: dto.certificats.map((certificat) => ({
          //       titre: certificat.titre,
          //       etablissement: certificat.etablissement,
          //       dateObtention: certificat.dateObtention,
          //       domaine: certificat.domaine,
          //     })),
          //   },
          // },
          skills: {
            createMany: {
              data: dto.skills.map((skill) => ({
                name: skill.name,
              })),
            },
          },
          facebookLink: dto.facebookLink,
          linkedInLink: dto.linkedInLink,
          websiteLink: dto.websiteLink,

          commentairesNotification: dto.commentairesNotification,
          offresNotification: dto.offresNotification,
          pushToutNotification: dto.pushToutNotification,
          pushEmailNotification: dto.pushEmailNotification,
          pushAucuneNotification: dto.pushAucuneNotification,

          // Vous pouvez inclure d'autres champs spécifiques du candidat ici
          // comme diplomeAcadymiques, certificats, skills, etc.
        },

        include: {
          diplomes: true,
          skills: true,
        },
      });
      const user = await this.prisma.user.create({
        data: {
          id: candidat.id, // Use the same id for both candidat and user
          createdAt: candidat.createdAt,
          updatedAt: candidat.updatedAt,
          email: candidat.email,
          hashedPassword: candidat.hashedPassword,
          image: candidat.image,
          firstName: candidat.firstName,
          lastName: candidat.lastName,
          userName: candidat.userName,
          location: candidat.ville,
          telNum: candidat.telNum,
          role: candidat.role,
        },
      });

      return { candidat, user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
