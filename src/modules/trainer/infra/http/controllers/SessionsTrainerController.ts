import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateTrainerService from '@modules/trainer/services/AuthenticateTrainerService';

class SessionsTrainerController{
	public async create(request: Request, response: Response): Promise<Response>{
		const {username, password} = request.body;

		const authenticateTrainer = container.resolve(AuthenticateTrainerService);
		const token = await authenticateTrainer.execute({username, password});

		return response.json({ token });
	}
}

export default SessionsTrainerController;
