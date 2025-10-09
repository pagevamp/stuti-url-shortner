import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ type: 'timestamp' })
  verifiedAt: Date

  @Column({ type: 'timestamp' })
  createdAt: Date

  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
}
