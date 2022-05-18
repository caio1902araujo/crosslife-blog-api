import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowAuthorProfileService from '@modules/author/services/ShowAuthorProfileService';
import UpdateAuthorProfileService from '@modules/author/services/UpdateAuthorProfileService';

class AuthorProfileController{
	public async show(request: Request, response: Response): Promise<Response>{
		const authorId = request.author.id;
		const showAuthorProfile = container.resolve(ShowAuthorProfileService);
		const author = await showAuthorProfile.execute(authorId);

		return response.json(instanceToInstance(author));
	}

  public async update(request: Request, response: Response): Promise<Response>{
    const authorId = request.author.id;
		const { name, username, password, description, oldPassword } = request.body;

		const updateAuthorProfile = container.resolve(UpdateAuthorProfileService);
		const author = await updateAuthorProfile.execute({ authorId, name, username, password, description, oldPassword });

		return response.json(instanceToInstance(author));
	}
}

export default AuthorProfileController;
