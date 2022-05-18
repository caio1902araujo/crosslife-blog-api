import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/mailProvider/models/IMailProvider';
import IStudentRepository from '../repositories/IStudentRepository';
import IStudentTokenRepository from '../repositories/IStudentTokenRepository';

import AppError from "@shared/errors/AppError";

interface IRequest{
	email: string,
}

@injectable()
class SendForgotPasswordEmailService{
	constructor(
		@inject('StudentRepository')
		private studentRepository: IStudentRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('StudentTokenRepository')
		private studentTokenRepository: IStudentTokenRepository,
	){}

	public async execute({email}: IRequest): Promise<void>{
		const student = await this.studentRepository.findByEmail(email);

		if(!student){
			throw new AppError('Esse aluno não existe', 400);
		}

		const {token} = await this.studentTokenRepository.generate(student.id);
		const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

		await this.mailProvider.sendMail({
			to:{
				name: student.name,
				email: student.email,
			},
			subject: '[Crosslife] recuperação de senha',
			templateData:{
				file: forgotPasswordTemplate,
				variables: {
					name: student.name,
					link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
				}
			}
		})
	}
}

export default SendForgotPasswordEmailService;
