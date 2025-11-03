import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'user/entities/user.entity';

@Entity('urls')
export class Url {
  constructor(url: Partial<Url>) {
    Object.assign(this, url);
  }
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  readonly user: User;

  @Column({ nullable: false, type: 'varchar' })
  original_url: string;

  @Column({ unique: true, type: 'varchar' })
  short_url?: string | null;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deleted_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  expires_at?: Date | null;

  @Column({ default: false, type: 'boolean' })
  notified: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;
}
