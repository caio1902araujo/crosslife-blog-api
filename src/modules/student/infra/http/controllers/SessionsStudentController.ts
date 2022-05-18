import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateStudentService from '@modules/student/services/AuthenticateStudentService';

class SessionsStudentController{
	public async create(request: Request, response: Response): Promise<Response>{
		const {username, password} = request.body;

		const authenticateStudent = container.resolve(AuthenticateStudentService);
		const token = await authenticateStudent.execute({username, password});

		return response.json({ token });
	}
}

export default SessionsStudentController;
