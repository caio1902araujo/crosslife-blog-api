import { injectable, inject } from 'tsyringe';
import path from 'path';

import Student from '../infra/typeorm/entities/Student';

import IStudentRepository from '../repositories/IStudentRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';

import AppError from "@shared/errors/AppError";

interface IRequest {
	name: string,
	telephone: string,
	cpf: string,
  email: string,
  username: string,
  password: string,
}

@injectable()
class CreateStudentService {
	constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,

    @inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	){}

	public async execute({name, cpf, telephone, email, username, password}: IRequest): Promise<Student>{
		const checkCPFExist = await this.studentRepository.findByCPF(cpf);

		if(checkCPFExist){
			throw new AppError('Esse CPF já esta em uso.', 400);
		}

    const checkEmailExist = await this.studentRepository.findByUsername(username);

		if(checkEmailExist){
			throw new AppError('O email ja esta em uso.', 400);
		}

		const passwordHashed = await this.hashProvider.generateHash(password);

		const student = await this.studentRepository.create({
			name,
      email,
      cpf,
      telephone,
			username,
			password: passwordHashed,
		});

    const credencialsStudentTemplate = path.resolve(__dirname, '..', 'views', 'credencials.hbs');

		await this.mailProvider.sendMail({
			to:{
				name: student.name,
				email: student.email,
			},
			subject: '[Crosslife] Credenciais do Sistema',
			templateData:{
				file: credencialsStudentTemplate,
				variables: {
					name: student.name,
					username: student.username,
					password: password,
				}
			}
		})

		return student;
	}
}

export default CreateStudentService;
