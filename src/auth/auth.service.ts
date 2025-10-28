import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerificationService } from 'email-verification/email-verification.service';
import { EmailVerification } from 'email-verification/entities/email-verification.entity';
import { Repository } from 'typeorm';
import { User } from 'user/entities/user.entity';
import { UserService } from 'user/user.service';
import { MailService } from 'utils/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepo: Repository<EmailVerification>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
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

    await this.mailService.sendMail(email, {
      template: 'email',
      from: this.configService.get('EMAIL_USER'),
      to : email,
      subject: `Verify Your Email Address`,
      project: '.SUS',
      url,
      expiresAt: expires_at.toUTCString(),
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

  public async resendVerificationLink(email: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new Error('User not found');

    if (user.verified_at) {
      throw new BadRequestException('Email already verified');
    }
    await this.sendEmail(user.email);
  }
}
