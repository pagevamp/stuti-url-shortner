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

  @OneToMany(() => EmailVerification, (verification) => verification.user)
  readonly emailVerifications: EmailVerification[];

  @OneToMany(() => Url, (url) => url.user)
  readonly urls: Url[];

  @Column()
  readonly name: string;

  @Column({ unique: true })
  readonly username: string;

  @Column({ unique: true })
  readonly email: string;

  @Column()
  readonly password: string;

  @Column({ type: 'timestamptz', nullable: true })
  readonly verified_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  readonly updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;
}
