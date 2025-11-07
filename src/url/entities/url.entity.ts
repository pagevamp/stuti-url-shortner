import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
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
  @Index('idx_urls_id')
  readonly id: string;

  @Column({ type: 'varchar', length: 255 })
  readonly original_url: string;

  @Column({ unique: true, type: 'varchar' })
  readonly short_url: string;

  @Column({ type: 'uuid' })
  readonly user_id: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  readonly deleted_at: Date;

  @Column({ type: 'timestamptz' })
  @Index('idx_expires_at')
  readonly expires_at: Date;

  @Column({ default: false, type: 'boolean' })
  @Index('idx_notified')
  notified: boolean; // to identify if a url has expired

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => UrlAnalytics, (url_analytics) => url_analytics.url)
  url_analytics: Url[];
}
