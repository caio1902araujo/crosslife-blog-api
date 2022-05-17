import { injectable, inject } from 'tsyringe';

import IAdminRepository from '../repositories/IAdminRepository';
import ITokenJWTProvider from '@shared/container/providers/tokenJWTProvider/models/ItokenJWTProvider';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	username: string,
	password: string,
}

@injectable()
class AuthenticateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('TokenJWTProvider')
    private tokenJWTProvider: ITokenJWTProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute({username, password}: IRequest): Promise<string>{
    const admin = await this.adminRepository.findByUsername(username);

    if(!admin){
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, admin.password);

    if(!passwordMatched){
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const token = this.tokenJWTProvider.signJWT({subject: admin.id,});

    return token;
  }
}

export default AuthenticateAdminService;
