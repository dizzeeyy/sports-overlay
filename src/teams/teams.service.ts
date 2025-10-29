import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { Repository } from 'typeorm';
import { TeamsCreateDto } from './teams-create.dto';
import { SportsService } from 'src/sports/sports.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Teams) private teamsRepository: Repository<Teams>,
    private sportsService: SportsService,
  ) {}

  async findAll(): Promise<Teams[]> {
    return await this.teamsRepository.find({
      relations: ['players', 'sport', 'seasons'],
    });
  }

  async findOne(id: string): Promise<Teams> {
    const team = await this.teamsRepository.findOne({
      where: { id },
      relations: ['players', 'seasons', 'sport'],
    });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async createTeams(teamsCreateDto: TeamsCreateDto[]): Promise<Teams[]> {
    const createdTeams: Teams[] = [];
    for (const teamDto of teamsCreateDto) {
      const team = await this.createTeam(teamDto);
      createdTeams.push(team);
    }
    return createdTeams;
  }

  async createTeam(teamsCreateDto: TeamsCreateDto): Promise<Teams> {
    const sport = await this.sportsService.findOne(teamsCreateDto.sportId);

    if (!sport) {
      throw new NotFoundException('Invalid sport ID - not found');
    }

    const team = this.teamsRepository.create({
      ...teamsCreateDto,
      sport: { id: teamsCreateDto.sportId },
    });

    return this.teamsRepository.save(team);
  }
}
