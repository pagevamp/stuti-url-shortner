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
  @PrimaryGeneratedColumn()
  readonly id: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ unique: true, type: 'varchar' })
  readonly token: string;

  @Column({ type: 'timestamptz' })
  readonly expires_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;
}
