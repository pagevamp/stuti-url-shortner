import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailVerification } from './entities/email-verification.entity';
import * as nodemailer from 'nodemailer';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepo: Repository<EmailVerification>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async SendEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new Error('User not found');

    const token = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME') / 60} mins`,
      },
    );

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    const text = `Hello from Stuti-Url-Shortener. \n\n Please click on this link : ${url} to verify your email address`;

    const transporter = nodemailer.createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });

    await transporter.sendMail({
      from: `Stuti Url Shortener <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Verify Your Email Address',
      text,
    });

    const expires_at = new Date(
      Date.now() + Number(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
    );
    await this.emailVerificationRepo.save({ user, token, expires_at });
  }
}
