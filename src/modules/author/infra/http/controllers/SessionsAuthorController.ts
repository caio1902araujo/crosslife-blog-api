import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateAuthorService from '@modules/author/services/AuthenticateAuthorService';

class SessionsAuthorController{
	public async create(request: Request, response: Response): Promise<Response>{
		const {username, password} = request.body;

		const authenticateAuthor = container.resolve(AuthenticateAuthorService);
		const token = await authenticateAuthor.execute({username, password});

		return response.json({ token });
	}
}

export default SessionsAuthorController;
