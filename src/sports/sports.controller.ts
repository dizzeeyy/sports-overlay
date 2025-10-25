import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SportsService } from './sports.service';
import { CreateSportDto } from './create-sport.dto';
import { Sports } from './sports.entity';
import { UpdateSportDto } from './update-sport.dto';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  async getAllSports(): Promise<Sports[]> {
    return this.sportsService.findAll();
  }

  @Get('id/:id')
  async getSportById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Sports | null> {
    return this.sportsService.findOne(id);
  }

  @Get('name/:name')
  async getSportByName(@Param('name') name: string): Promise<Sports | null> {
    return this.sportsService.findOneByName(name);
  }

  @Post('add')
  async createSport(@Body() createSportDto: CreateSportDto): Promise<Sports> {
    return this.sportsService.create(createSportDto);
  }

  @Put('update')
  async updateSportByName(
    @Body() updateSportDto: CreateSportDto,
  ): Promise<Sports> {
    return this.sportsService.updateSport(updateSportDto);
  }

  @Delete('delete/:id')
  deleteSport(@Param('id') id: string): Promise<void> {
    return this.sportsService.deleteSport(id);
  }
}
