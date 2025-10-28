import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Status {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
}

export enum AuthType {
  KEY = 'key',
  OAUTH = 'OAuth',
}

@Entity()
export class Licenses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  api_key: string;

  @Column()
  api_license: string;

  @Column()
  api_url: string;

  @Column()
  client_id: number;

  @Column()
  application_id: number;

  @Column({
    type: 'enum',
    enum: AuthType,
  })
  authorization_type: AuthType;

  @Column()
  sign: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;
}
