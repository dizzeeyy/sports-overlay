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
}
