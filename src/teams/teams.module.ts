import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teams } from './teams.entity';
import { Seasons } from './season.entity';
import { SportsModule } from 'src/sports/sports.module';
import { Match } from 'src/matches/match.entity';
import { Player } from 'src/players/player.entity';
import { MatchPlayer } from 'src/matches/match-player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teams, Seasons, Match, Player, MatchPlayer]),
    SportsModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
