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
import { AdminService } from './admin.service';
import { JwtGuard } from 'src/user/guard';
import { UpdateRecruteurDto } from './dto/update-recruteur.dto';
import { CreateRecruteurDto } from './dto/create-recruteur.dto';

//@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('add-recruteur')
  createRecruteur(@Body() dto: CreateRecruteurDto) {
    return this.adminService.createRecruteur(dto);
  }

  @Patch('update-recruteur/:id')
  async updateRecruteur(
    @Param('id') id: string,
    @Body() dto: UpdateRecruteurDto,
  ) {
    try {
      const updatedRecruteur = await this.adminService.updateRecruteur(id, dto);
      return { user: updatedRecruteur };
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
  @Get('recruteurs')
  async getAllRecruteurs() {
    try {
      const recruteurs = await this.adminService.getAllRecruteurs();
      return recruteurs;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  @Get('recruteur/:id')
  async getRecruteurById(@Param('id') id: string) {
    try {
      const recruteur = await this.adminService.getRecruteurById(id);
      return recruteur;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }

  // Delete Recruteur by ID
  @Delete('recruteurs/:id')
  async deleteRecruteur(@Param('id') id: string) {
    try {
      const deletedRecruteur = await this.adminService.deleteRecruteur(id);
      return {
        message: 'Deleted successfully',
        user: deletedRecruteur,
      };
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
}
