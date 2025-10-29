import { Url } from 'url/entities/url.entity';
import { EmailVerification } from '../../email-verification/entities/email-verification.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => EmailVerification, (verification) => verification.user)
  emailVerifications: EmailVerification[];

  @OneToMany(() => Url, (url) => url.user)
  urls: Url[];

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamptz', nullable: true })
  verified_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}


