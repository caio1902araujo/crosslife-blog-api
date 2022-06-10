import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/student/repositories/IStudentRepository';
import IStudentTokenRepository from '@modules/student/repositories/IStudentTokenRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import { differenceInHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,

    @inject('StudentTokenRepository')
    private studentTokenRepository: IStudentTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const studentToken = await this.studentTokenRepository.findByToken(token);

    if (!studentToken) {
      throw new AppError('User token does not exists.');
    }

    const student = await this.studentRepository.findById(
      studentToken.studentId,
    );

    if (!student) {
      throw new AppError('Esse(a) Aluno(a) não existe.', 404);
    }

    const tokenCreateAt = studentToken.createdAt;

    if (differenceInHours(new Date(Date.now()), tokenCreateAt) > 2) {
      throw new AppError('Token expirado', 401);
    }

    student.password = await this.hashProvider.generateHash(password);
    await this.studentRepository.save(student);
  }
}

export default ResetPasswordService;
