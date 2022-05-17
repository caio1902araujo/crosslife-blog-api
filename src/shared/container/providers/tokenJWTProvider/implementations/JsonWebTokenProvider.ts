import { sign } from 'jsonwebtoken';
import ITokenJWTProvider from '../models/ItokenJWTProvider';
import authConfig from '@config/auth';

class JsonWebTokenProvider implements ITokenJWTProvider {
	public async signJWT(payload: object): Promise<string> {
    const token = sign({}, authConfig.jwt.secret, {expiresIn: authConfig.jwt.expiresIn, ...payload});
    return token;
  }
}

export default JsonWebTokenProvider;
