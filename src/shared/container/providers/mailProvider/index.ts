import { container } from 'tsyringe';

import NodemailerMailProvider from './implementations/NodemailerMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  nodemailer: NodemailerMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers.nodemailer,
);
