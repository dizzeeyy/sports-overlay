import { Sports } from 'src/sports/sports.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seasons } from './season.entity';
import { Match } from 'src/matches/match.entity';
import { Player } from 'src/players/player.entity';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ length: 3 })
  shortName: string;

  @Column()
  logo: string;

  @Column()
  city: string;

  @OneToMany(() => Seasons, (seasons) => seasons.team, { cascade: true })
  seasons: Seasons[];

  @ManyToOne(() => Sports, (sport) => sport.teams, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sportId' })
  sport: Sports;

  @OneToMany(() => Match, (match) => match.homeTeam)
  homeMatches: Match[];

  @OneToMany(() => Match, (match) => match.awayTeam)
  awayMatches: Match[];

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
