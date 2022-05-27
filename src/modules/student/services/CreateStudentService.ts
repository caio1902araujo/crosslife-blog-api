import { injectable, inject, container } from 'tsyringe';
import path from 'path';

import Student from '../infra/typeorm/entities/Student';

import IStudentRepository from '../repositories/IStudentRepository';
import IHashProvider from '@shared/container/providers/hashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';
import CreatePhysicalEvaluationService from '@modules/physicalEvaluation/services/CreatePhysicalEvaluationService';
import GenerateStudentCredentialsService from './GenerateStudentCredentialsService';

import AppError from "@shared/errors/AppError";

interface IRequest {
	name: string,
	telephone: string,
	cpf: string,
  email: string,
}

@injectable()
class CreateStudentService {
  private generateStudentCredentialsService;
  private createPhysicalEvaluationService;

	constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,

    @inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	){
    this.generateStudentCredentialsService = container.resolve(GenerateStudentCredentialsService);
    this.createPhysicalEvaluationService = new CreatePhysicalEvaluationService();
  }

	public async execute({name, cpf, telephone, email}: IRequest): Promise<Student>{
		const checkCPFExist = await this.studentRepository.findByCPF(cpf);

		if(checkCPFExist){
			throw new AppError('Esse CPF já esta em uso.', 400);
		}

    const checkEmailExist = await this.studentRepository.findByUsername(email);

		if(checkEmailExist){
			throw new AppError('O email ja esta em uso.', 400);
		}

    const {username, password} = await this.generateStudentCredentialsService.execute(name);

		const passwordHashed = await this.hashProvider.generateHash(password);

    const physicalEvaluation = await this.createPhysicalEvaluationService.execute(
      {
        fat_mass:0,
        lean_mass:0,
        muscle_mass:0,
        bone_density:0,
        visceral_fat:0,
        basal_metabolism:0,
        hydration:0
      }
    );

		const student = await this.studentRepository.create({
			name,
      email,
      cpf,
      telephone,
			username,
			password: passwordHashed,
      physicalEvaluation,
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
