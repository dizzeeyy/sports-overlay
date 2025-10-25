import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teams } from './teams.entity';
import { Length } from 'class-validator';

@Entity()
export class Seasons {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  wins: number;

  @Column()
  loses: number;

  @Column({ default: false })
  playoffs: boolean;

  @Column({ default: false })
  champion: boolean;

  @ManyToOne(() => Teams, (team) => team.seasons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teamId' })
  team: Teams;

  @Column()
  teamId: string;
}
