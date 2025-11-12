import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LogMetaData } from 'types/metadata';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column({ type: 'varchar', nullable: true })
  readonly context?: string | null;

  @Column({ type: 'text', nullable: true })
  readonly message?: string | null;

  @Column({ type: 'jsonb', nullable: true })
  readonly metadata?: LogMetaData | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;
}
