import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Url } from 'url/entities/url.entity';

@Entity('url_analytics')
export class UrlAnalytics {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Url, (url) => url.id, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'url_id', referencedColumnName: 'id' })
  url: Url;

  @Column({ nullable: true })
  readonly ip_address: string;

  @Column({ nullable: true })
  readonly country: string;

  @Column({ nullable: true })
  readonly user_agent: string;

  @Column({ nullable: true })
  readonly browser: string;

  @Column({ nullable: true })
  readonly os: string;

  @Column({ nullable: true })
  readonly device: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  readonly clicked_at: Date;
}
