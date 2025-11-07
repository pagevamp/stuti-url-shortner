import { Url } from 'url/entities/url.entity';
import { EmailVerifications } from '../../email-verification/entities/email-verification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
  @PrimaryGeneratedColumn('uuid')
  @Index('idx_user_id')
  readonly id: string;

  @Column({ type: 'varchar' })
  readonly name: string;

  @Column({ unique: true, type: 'varchar' })
  readonly username: string;

  @Column({ unique: true, type: 'varchar' })
  @Index('idx_user_email')
  readonly email: string;

  @Column({ type: 'varchar' })
  readonly password: string;

  @Column({ type: 'timestamptz', nullable: true })
  @Index('idx_verified_at')
  verified_at?: Date | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @Index('idx_verified_at')
  readonly created_at: Date;

  @OneToMany(() => EmailVerifications, (verification) => verification.user)
  emailVerifications: EmailVerifications[];

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];
}
