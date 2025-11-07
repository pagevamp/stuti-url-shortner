import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('email_verifications')
export class EmailVerifications {
  @PrimaryGeneratedColumn('uuid')
  @Index('idx_email_id')
  readonly id: string;

  @Column({ unique: true, type: 'varchar', nullable: true })
  @Index('idx_email_token')
  readonly token?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  @Index('idx_expires_at')
  readonly expires_at?: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
