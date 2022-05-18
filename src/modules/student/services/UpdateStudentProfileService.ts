import { inject, injectable } from 'tsyringe';

import Student from '../infra/typeorm/entities/Student';

import IStudentRepository from '../repositories/IStudentRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
	studentId: string
	name: string,
  email: string,
  telephone: string,
  username: string,
	oldPassword?: string,
	password?: string,
}

@injectable()
class UpdateStudentProfileService{
	constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	){}

	public async execute({studentId, name, email, username, telephone, oldPassword, password}: IRequest): Promise<Student> {
		const student = await this.studentRepository.findById(studentId);

		if(!student){
			throw new AppError('Aluno(a) não existe.', 404);
		}

		const studentWithUpdatedUsername = await this.studentRepository.findByUsername(username);

		if(studentWithUpdatedUsername && studentWithUpdatedUsername.id !== studentId){
			throw new AppError('Esse nome de usuário já esta em uso', 400);
		}

    const studentWithUpdatedEmail = await this.studentRepository.findByEmail(email);

		if(studentWithUpdatedEmail && studentWithUpdatedEmail.id !== studentId){
			throw new AppError('Esse nome de usuário já esta em uso', 400);
		}

		student.name = name;
		student.username = username;
    student.email = email;
    student.telephone = telephone;

		if(password && !oldPassword){
			throw new AppError('Você precisa informar a senha antiga para definir uma nova senha.', 400);
		}

		if(password && oldPassword){
			const checkOldPassword = await this.hashProvider.compareHash(oldPassword, student.password);

			if(!checkOldPassword){
				throw new AppError('Senha antiga não confere.', 400);
			}

			student.password = await this.hashProvider.generateHash(password);
		}

		return await this.studentRepository.save(student);
	}
}

export default UpdateStudentProfileService;
