import { container } from 'tsyringe';

import BCryptHashProvider from './implementations/BCryptHashProvider';
import IHashProvider from './models/IHashProvider';

const providers = {
  bcryptr: BCryptHashProvider,
};

container.registerSingleton<IHashProvider>(
  'HashProvider',
  providers.bcryptr,
);
