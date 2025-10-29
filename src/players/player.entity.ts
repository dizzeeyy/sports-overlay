import { MatchPlayer } from 'src/matches/match-player.entity';
import { Teams } from 'src/teams/teams.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100 })
  firstName: string;

  @Column({ nullable: false, length: 100 })
  lastName: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  position: string;

  @ManyToOne(() => Teams, (team) => team.players)
  team: Teams;

  @OneToMany(() => MatchPlayer, (matchPlayer) => matchPlayer.player)
  matchStats: MatchPlayer[];
}
