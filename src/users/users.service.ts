import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { EntityManager, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {} // EntityManager exposes a number of methods from typeorm that allows us to interact with the database

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto) // the createUserDto matches all the properties on the item itself
    await this.entityManager.save(user) // save create new entities if they do not exist or else just update and save and persist it to the database
  }

  async findAll() {
    return this.usersRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
