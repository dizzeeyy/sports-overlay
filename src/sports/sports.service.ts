import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './create-sport.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sports } from './sports.entity';
import { Repository } from 'typeorm';
import { UpdateSportDto } from './update-sport.dto';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sports)
    private sportsRepository: Repository<Sports>,
  ) {}

  async findOne(id: string): Promise<Sports | null> {
    const found = await this.sportsRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Sport with id ${id} not found`);
    }
    return found;
  }

  async findOneByName(name: string): Promise<Sports | null> {
    const found = await this.sportsRepository.findOneBy({ name });
    if (!found) {
      throw new NotFoundException(`Sport with name ${name} not found`);
    }
    return found;
  }

  async findAll(): Promise<Sports[]> {
    const found = await this.sportsRepository.find();
    if (!found || found.length === 0) {
      throw new NotFoundException('No sports found');
    }
    return found;
  }
  async create(createSportDto: CreateSportDto): Promise<Sports> {
    const entity = this.sportsRepository.create(createSportDto);
    return this.sportsRepository.save(entity);
  }

  async updateSport(updateSportDto: CreateSportDto): Promise<Sports> {
    const sport = await this.findOneByName(updateSportDto.name);
    if (!sport) {
      throw new NotFoundException(
        `Sport with name ${updateSportDto.name} not found`,
      );
    }
    const updatedSport = this.sportsRepository.merge(sport, updateSportDto);
    return this.sportsRepository.save(updatedSport);
  }

  async deleteSport(id: string): Promise<void> {
    const isAdded = await this.findOne(id);
    if (!isAdded) {
      throw new NotFoundException('Sport not found');
    }
    await this.sportsRepository.delete(id);
  }
}
