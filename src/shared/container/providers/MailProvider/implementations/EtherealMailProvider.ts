import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvier';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const sentMail = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log(nodemailer.getTestMessageUrl(sentMail));
  }
}

export default EtherealMailProvider;
