import { Url } from 'url/entities/url.entity';
import { EmailVerification } from '../../email-verification/entities/email-verification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
  readonly email: string;

  @Column({ type: 'varchar' })
  readonly password: string;

  @Column({ type: 'timestamptz', nullable: true })
  verified_at?: Date | null;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at?: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @OneToMany(() => EmailVerification, (verification) => verification.user)
  emailVerifications: EmailVerification[];

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];
}
