import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from 'users/entities/user.entity'

@Entity()
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
  user: User

  @Column({ unique: true })
  token: string

  @Column({ type: 'timestamptz' })
  expires_at: Date

  @Column({ default: false })
  is_used: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date
}
