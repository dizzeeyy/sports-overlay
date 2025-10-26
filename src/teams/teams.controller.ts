import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Teams } from './teams.entity';
import { TeamsCreateDto } from './teams-create.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Teams')
@ApiBearerAuth('Authorization in Swagger')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Get()
  async findAll(): Promise<Teams[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Teams> {
    return this.teamsService.findOne(id);
  }

  @Post('add')
  async createTeam(@Body() teamData: TeamsCreateDto): Promise<Teams> {
    return this.teamsService.createTeam(teamData);
  }
}
