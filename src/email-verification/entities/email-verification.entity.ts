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
export class EmailVerifications {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ unique: true, type: 'varchar' })
  readonly token: string;

  @Column({ type: 'timestamptz' })
  readonly expires_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
