import { Teams } from 'src/teams/teams.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MatchPlayer } from './match-player.entity';

export enum MatchStatuses {
  SCHEDULED = 'scheduled',
  FINISHED = 'finished',
  LIVE = 'live',
}

@Entity()
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Teams, (team) => team.homeMatches)
  homeTeam: Teams;

  @ManyToOne(() => Teams, (team) => team.awayMatches)
  awayTeam: Teams;

  @Column()
  date: Date;

  @Column({ nullable: true })
  homeScore: number;

  @Column({ nullable: true })
  awayScore: number;

  @Column({ nullable: true })
  homeFouls: number;

  @Column({ nullable: true })
  awayFouls: number;

  @OneToMany(() => MatchPlayer, (matchPlayer) => matchPlayer.match)
  playerStats: MatchPlayer[];

  @Column({ default: MatchStatuses.SCHEDULED, enum: MatchStatuses })
  status: MatchStatuses;
}
