import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('email_verifications')
export class EmailVerification {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ unique: true, type: 'varchar', nullable: true })
  readonly token: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  readonly expires_at?: Date | null;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  readonly created_at?: Date | null;
}
