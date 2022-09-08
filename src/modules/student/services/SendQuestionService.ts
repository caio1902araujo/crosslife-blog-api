import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';

interface IRequest {
  name: string;
  question: string;
  email: string;
}

@injectable()
class SendQuestionService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ name, question, email }: IRequest): Promise<void> {
    const questionTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'question.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: 'contato Crosslife',
        email: 'contatocrosslifesuzano@gmail.com',
      },
      replyTo: email,
      subject: '[Crosslife] dúvida sobre a academia',
      templateData: {
        file: questionTemplate,
        variables: {
          name: name,
          email: email,
          question: question,
        },
      },
    });
  }
}

export default SendQuestionService;
