import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IStudentRepository from '../repositories/IStudentRepository';

@injectable()
class DeleteStudentService {
  constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,
	){}

  public async execute(id:string): Promise<void> {
    const student = await this.studentRepository.findById(id);

    if(!student){
      throw new AppError('Esse Aluno(a) não existe', 404);
    }

    await this.studentRepository.delete(id);
  }
}

export default DeleteStudentService;
