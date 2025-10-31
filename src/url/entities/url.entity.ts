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

  @Column()
  readonly original_url: string;

  @Column({ unique: true })
  readonly short_url: string;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  readonly expires_at: Date;

  @Column({ default: false })
  notified: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;
}
