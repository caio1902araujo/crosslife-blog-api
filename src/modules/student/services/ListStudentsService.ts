import { inject, injectable } from 'tsyringe';

import IStudentRepository from '../repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Student';
import IFindAllStudentDTO from '../dtos/IFindAllStudentDTO';

@injectable()
class ListStudentsService {
  constructor(
    @inject('StudentRepository')
    private studentRepository: IStudentRepository,
  ) {}

  public async execute({
    name,
    username,
    cpf,
    limit,
    offset,
  }: IFindAllStudentDTO): Promise<[Student[], number]> {
    const students = await this.studentRepository.findAllStudents({
      name,
      username,
      cpf,
      limit,
      offset,
    });

    return students;
  }
}

export default ListStudentsService;
