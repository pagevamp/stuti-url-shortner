import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ type: 'timestamptz', nullable: true })
  verified_at: Date

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  created_at: Date

  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
}
