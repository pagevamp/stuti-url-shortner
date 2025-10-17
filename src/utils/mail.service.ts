import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail({
    from,
    to,
    subject,
    text,
    html,
  }: {
    from:string
    to: string;
    subject: string;
    text?: string;
    html?: string;
  }) {
    
    return this.transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });
  }
}
