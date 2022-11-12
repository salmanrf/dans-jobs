import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  user_uuid: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  full_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  session_id: string;

  @CreateDateColumn()
  created_at: Date | string;

  @UpdateDateColumn()
  updated_at: Date | string;
}
