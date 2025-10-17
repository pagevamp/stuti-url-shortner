import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
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
    private readonly userService: UserService,
  ) {}

  public async sendEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new Error('User not found');

    const expires_at = new Date(
      Date.now() + Number(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
    );

    const token = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME') / 60} mins`,
      },
    );

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    const text = `Hello from Stuti-Url-Shortener. \n\nPlease click on this link below : \n\n${url} \n\nto verify your email address. \n\nThis link expires on ${expires_at}`;

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

    await this.emailVerificationRepo.save({ user, token, expires_at });
  }

  public async verifyEmail(email: string) {
    await this.userService.confirmEmail(email);
  }

  public async decodeVerificationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException('Invalid token payload structure');
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Your email confirmation token has expired');
      }
    }
    throw new BadRequestException('Failed to verify email token');
  }
}
