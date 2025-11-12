import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from 'url/entities/url.entity';

@Entity('url_analytics')
export class UrlAnalytics {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: true, type: 'varchar' })
  readonly ip_address?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  readonly country?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  readonly user_agent?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  readonly browser?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  readonly os?: string | null;

  @Column({ nullable: true, type: 'varchar' })
  readonly device?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  @Index('idx_url_analytics_clicked_at')
  readonly clicked_at: Date;

  @ManyToOne(() => Url, (url) => url.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'url_id', referencedColumnName: 'id' })
  readonly url: Url;
}
