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
  readonly id: string;

  @Column({ type: 'varchar', length: 255 })
  readonly original_url: string;

  @Column({ unique: true, type: 'varchar' })
  @Index('idx_urls_short_url')
  readonly short_url: string;

  @Column({ type: 'uuid' })
  readonly user_id: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  @Index('idx_urls_deleted_at')
  readonly deleted_at: Date;

  @Column({ type: 'timestamptz' })
  @Index('idx_urls_expires_at')
  readonly expires_at: Date;

  @Column({ default: false, type: 'boolean' })
  @Index('idx_urls_notified')
  readonly notified: boolean; // to identify if a url has expired

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  readonly user: User;

  @OneToMany(() => UrlAnalytics, (url_analytics) => url_analytics.url)
  readonly url_analytics: Url[];
}
