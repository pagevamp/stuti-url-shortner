import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class HashService {
  private readonly SALT_LENGTH = 16;

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(this.SALT_LENGTH).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }

  async comparePassword(pass: string, password: string): Promise<boolean> {
    const [salt, key] = password.split('.');
    const hashBuffer = (await scrypt(pass, salt, 32)) as Buffer;
    return key === hashBuffer.toString('hex');
  }
}
