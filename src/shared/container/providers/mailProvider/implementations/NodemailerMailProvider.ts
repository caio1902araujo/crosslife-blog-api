import nodemailer, {SentMessageInfo} from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';
import IMailTemplateProvider from '../../mailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class NodemailerMailProvider implements IMailProvider{
	private client: SentMessageInfo;

	constructor(
    @inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider
  ){
		this.client = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
      },
      tls: { rejectUnauthorized: true }
    });
	}

	public async sendMail({to, from, subject, templateData}: ISendMailDTO): Promise<void> {
		await this.client.sendMail(
      {
        from:{
          name: from?.name || 'Equipe Crosslife',
          address: to.email || 'equipe@crosslife.com.br',
        },
        to:{
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      }
    );
	}
}

export default NodemailerMailProvider
