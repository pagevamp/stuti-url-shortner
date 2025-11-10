import { Injectable } from '@nestjs/common';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LogMetaData } from 'types/metadata';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepo: Repository<Log>,
  ) {}

  async createLog(context?: string, message?: string, metadata?: LogMetaData) {
    await this.logRepo.save({ context, message, metadata });
  }

  async findAll() {
    await this.logRepo.find();
  }
}
