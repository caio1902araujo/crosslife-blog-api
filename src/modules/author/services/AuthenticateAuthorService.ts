import { injectable, inject } from 'tsyringe';

import IAuthorRepository from '../repositories/IAuthorRepository';
import ITokenJWTProvider from '@shared/container/providers/tokenJWTProvider/models/ItokenJWTProvider';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	username: string,
	password: string,
}

@injectable()
class AuthenticateAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorRepository: IAuthorRepository,

    @inject('TokenJWTProvider')
    private tokenJWTProvider: ITokenJWTProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}


  public async execute({username, password}: IRequest): Promise<string>{
    const author = await this.authorRepository.findByUsername(username);

    if(!author){
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, author.password);

    if(!passwordMatched){
      throw new AppError('Email ou senha inválidos.', 401);
    }

    const token = this.tokenJWTProvider.signJWT({subject: author.id,});

    return token;
  }

}

export default AuthenticateAuthorService
