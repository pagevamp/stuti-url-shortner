import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UrlAnalytics } from 'url-analytics/entities/url-analytics.entity';
import { User } from 'user/entities/user.entity';

@Entity('urls')
export class Url {
  constructor(url: Partial<Url>) {
    Object.assign(this, url);
  }
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, (user) => user.id, {onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => UrlAnalytics, (url_analytics) => url_analytics.url)
  url_analytics: Url[];

  @Column({ type: 'varchar', length: 255 })
  readonly original_url: string;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  readonly short_url?: string | null;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  readonly expires_at?: Date | null;

  @Column({ default: false, type: 'boolean' })
  notified: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date ;
}
