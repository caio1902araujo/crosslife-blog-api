import { inject, injectable } from 'tsyringe';

import Student from '../infra/typeorm/entities/Student';

import IStudentRepository from '../repositories/IStudentRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowStudentProfileService{
	constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,
	){}

	public async execute(studentId: string): Promise<Student> {
		const student = await this.studentRepository.findById(studentId);

		if(!student){
			throw new AppError('Aluno(a) não encontrado(a).', 404);
		}

		return student;
	}
}

export default ShowStudentProfileService;
