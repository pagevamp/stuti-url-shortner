import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column({type : 'varchar'})
  readonly context: string;

  @Column({ type: 'text' })
  readonly message: string;

  @Column({ type: 'json', nullable: true })
  readonly metadata?: Record<string, any>;

  @CreateDateColumn()
  readonly created_at: Date;
}
