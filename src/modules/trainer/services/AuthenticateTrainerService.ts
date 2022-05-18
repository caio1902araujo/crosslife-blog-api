import { injectable, inject } from 'tsyringe';

import ITrainerRepository from '../repositories/ITrainerRepository';
import ITokenJWTProvider from '@shared/container/providers/tokenJWTProvider/models/ItokenJWTProvider';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	username: string,
	password: string,
}

@injectable()
class AuthenticateTrainerService {
  constructor(
    @inject('TrainerRepository')
    private trainerRepository: ITrainerRepository,

    @inject('TokenJWTProvider')
    private tokenJWTProvider: ITokenJWTProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}


  public async execute({username, password}: IRequest): Promise<string>{
    const trainer = await this.trainerRepository.findByUsername(username);

    if(!trainer){
      throw new AppError('Nome de usuário ou senha inválidos.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, trainer.password);

    if(!passwordMatched){
      throw new AppError('Nome de usuário ou senha inválidos.', 401);
    }

    const token = this.tokenJWTProvider.signJWT({subject: trainer.id,});

    return token;
  }

}

export default AuthenticateTrainerService;
