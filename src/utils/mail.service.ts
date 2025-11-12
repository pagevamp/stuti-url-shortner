import { MailData } from './mail.types';
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import * as fs from 'fs/promises';
import Handlebars from 'handlebars';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(to: string, data: MailData) {
    const templatePath = path.join(__dirname, '..', 'config', `${data.template}.hbs`);
    const source = await fs.readFile(templatePath, 'utf8');
    const template = Handlebars.compile(source);
    const html = template(data);

    return this.transporter.sendMail({
      from: `"${data.project}" <${this.configService.get('EMAIL_USER')}>`,
      to,
      subject: data.subject,
      html,
      attachments: [
        {
          filename: 'SUS.png',
          path: path.join(__dirname, '..', 'assets', 'SUS.png'),
          cid: 'SUS',
        },
      ],
    });
  }
}
