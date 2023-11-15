import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get('Email_HOST'),
      port: configService.get('Email_PORT'),
      secure: false,
      auth: {
        user: configService.get('Email_USER'),
        pass: configService.get('Email_PASS'),
      },
    });
  }
  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: this.configService.get('Email_NAME'),
        address: this.configService.get('ADDRESS'),
      },
      to,
      subject,
      html,
    });
  }
}
