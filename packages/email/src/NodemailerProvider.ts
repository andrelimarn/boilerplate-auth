import nodemailer from 'nodemailer';
import { IMailProvider, IMailMessage } from '@auth/core';

export class NodemailerProvider implements IMailProvider {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'test_user', // generated ethereal user
        pass: 'test_pass', // generated ethereal password
      },
    });
  }

  async sendMail(message: IMailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: message.to, // list of receivers
      subject: message.subject, // Subject line
      text: message.body, // plain text body
      html: `<b>${message.body}</b>`, // html body
    });
  }
}
