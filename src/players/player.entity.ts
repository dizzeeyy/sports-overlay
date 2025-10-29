import { MatchPlayer } from 'src/matches/match-player.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => MatchPlayer, (matchPlayer) => matchPlayer.player)
  matchStats: MatchPlayer[];
}
