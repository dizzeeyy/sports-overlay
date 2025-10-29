import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';
import { Player } from 'src/players/player.entity';

@Entity()
export class MatchPlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Match, (match) => match.playerStats, { onDelete: 'CASCADE' })
  match: Match;

  @ManyToOne(() => Player, (player) => player.matchStats, {
    onDelete: 'CASCADE',
  })
  player: Player;

  @Column({ default: false })
  isStartingFive: boolean;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  assists: number;

  @Column({ default: 0 })
  fouls: number;

  @Column({ default: 0 })
  rebounds: number;

  @Column({ default: 0 })
  blocks: number;

  @Column({ default: 0 })
  steals: number;

  @Column({ default: 0 })
  turnovers: number;

  @Column({ default: 0 })
  minutesPlayed: number;

  @Column({ default: 0 })
  percentFT: number;

  @Column({ default: 0 })
  percent3P: number;

  @Column({ default: 0 })
  percentFG: number;
}
