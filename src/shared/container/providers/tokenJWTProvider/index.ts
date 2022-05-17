import { container } from 'tsyringe';

import JsonWebTokenProvider from './implementations/JsonWebTokenProvider';
import ITokenJWTProvider from './models/ItokenJWTProvider'

const providers = {
  jsonwebtoken: JsonWebTokenProvider,
};

container.registerSingleton<ITokenJWTProvider>(
  'TokenJWTProvider',
  providers.jsonwebtoken,
);
