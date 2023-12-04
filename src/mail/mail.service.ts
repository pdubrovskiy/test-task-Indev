import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  public async sendActivationEmail(
    to: string,
    activationLink: string,
  ): Promise<void> {
    const activationLinkForLetter = `${process.env.API_URL}/auth/activate/${to}/${activationLink}`;
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: 'Email Activation',
      html: `
  <div>
    <h1>Email Activation</h1>
    <p>Click the following link to activate your email:</p>
    <a href="${activationLinkForLetter}">Activate</a>
  </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  public async sendPassWordResetEmail(
    to: string,
    resetToken: string,
  ): Promise<void> {
    const resetPasswordLinkForLetter = `${process.env.API_URL}/auth/reset-password/${to}/${resetToken}`;
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: 'Reset Password',
      html: `
  <div>
    <h1>Reset Password</h1>
    <p>Make POST request to this link with "newPassword" in body:</p>
    <a href="${resetPasswordLinkForLetter}">${resetPasswordLinkForLetter}</a>
  </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
