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
  readonly id: string;

  @Column({ type: 'varchar' })
  readonly name: string;

  @Column({ unique: true, type: 'varchar' })
  readonly username: string;

  @Column({ unique: true, type: 'varchar' })
  @Index('idx_users_email')
  readonly email: string;

  @Column({ type: 'varchar' })
  readonly password: string;

  @Column({ type: 'timestamptz', nullable: true })
  @Index('idx_users_verified_at')
  readonly verified_at?: Date | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @OneToMany(() => EmailVerifications, (verification) => verification.user)
  readonly emailVerifications: EmailVerifications[];

  @OneToMany(() => Url, (url) => url.user)
  readonly urls: Url[];
}
