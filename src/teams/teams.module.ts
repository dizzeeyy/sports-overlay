import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { Seasons } from './season.entity';
import { SportsModule } from 'src/sports/sports.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teams, Seasons]), SportsModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
