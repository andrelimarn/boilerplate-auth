export interface IMailMessage {
  to: string;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendMail(message: IMailMessage): Promise<void>;
}
