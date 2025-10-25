import { Teams } from 'src/teams/teams.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sports {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Teams, (team) => team.sport)
  teams: Teams[];
}
