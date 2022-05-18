import { injectable, inject } from 'tsyringe';

import IStudentRepository from '../repositories/IStudentRepository';
import ITokenJWTProvider from '@shared/container/providers/tokenJWTProvider/models/ItokenJWTProvider';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	username: string,
	password: string,
}

@injectable()
class AuthenticateStudentService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('TokenJWTProvider')
    private tokenJWTProvider: ITokenJWTProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}


  public async execute({username, password}: IRequest): Promise<string>{
    const student = await this.studentRepository.findByUsername(username);

    if(!student){
      throw new AppError('Nome de usuário ou senha inválidos.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, student.password);

    if(!passwordMatched){
      throw new AppError('Nome de usuário ou senha inválidos.', 401);
    }

    const token = this.tokenJWTProvider.signJWT({subject: student.id,});

    return token;
  }

}

export default AuthenticateStudentService;
