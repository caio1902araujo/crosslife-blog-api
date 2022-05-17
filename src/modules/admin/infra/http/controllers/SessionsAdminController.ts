import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateAdminService from '@modules/admin/services/AuthenticateAdminService';

class SessionsAdminController{
	public async create(request: Request, response: Response): Promise<Response>{
		const {username, password} = request.body;

		const authenticateAdmin = container.resolve(AuthenticateAdminService);
		const token = await authenticateAdmin.execute({username, password});

		return response.json({ token });
	}
}

export default SessionsAdminController;
