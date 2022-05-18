import { inject, injectable } from 'tsyringe';

import IStudentRepository from '../repositories/IStudentRepository';

import Student from '../infra/typeorm/entities/Student'

interface IRequest {
  name: string,
	username: string,
  cpf: string,
  offset: number,
  limit: number,
  order: 'DESC' | 'ASC'
}

@injectable()
class ListStudentsService{
	constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,
	){}

	public async execute({name, username, cpf, limit, offset, order}: IRequest): Promise<Student[]> {
		const students = await this.studentRepository.findAllStudents({name, username, cpf, limit, offset, order});

		return students;
	}
}

export default ListStudentsService;
