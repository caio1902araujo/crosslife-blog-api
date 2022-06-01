import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe';

import ShowAuthorPresentationService from '@modules/author/services/ShowAuthorPresentationService';
import CreateAuthorService from '@modules/author/services/CreateAuthorService';
import DeleteAuthorService from '@modules/author/services/DeleteAuthorService';
import ListAuthorsService from '@modules/author/services/ListAuthorsService';
import IFindAllAuthorDTO from '@modules/author/dtos/IFindAllAuthorDTO';

class AuthorController{
	public async show(request: Request, response: Response): Promise<Response>{
		const username = request.params.username;

		const showAuthor = container.resolve(ShowAuthorPresentationService);
		const author = await showAuthor.execute(username);

		return response.json(instanceToInstance(author));
	}

  public async delete(request: Request, response: Response): Promise<Response>{
    const id = request.params.id as string;
    const deleteAuthorService = container.resolve(DeleteAuthorService);
    await deleteAuthorService.execute(id);

    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response>{
		const { name, username, password, description } = request.body;

		const createAuthorProfile = container.resolve(CreateAuthorService);
		const author = await createAuthorProfile.execute({ name, username, password, description });

		return response.json(instanceToInstance(author));
	}

  public async index(request: Request, response: Response): Promise<Response>{
    const { name, username, limit, offset } = request.query as IFindAllAuthorDTO;

		const listAuthorsService = container.resolve(ListAuthorsService);
		const authors = await listAuthorsService.execute({ name, username, limit, offset });

		return response.json(instanceToInstance(authors));
	}
}

export default AuthorController;
