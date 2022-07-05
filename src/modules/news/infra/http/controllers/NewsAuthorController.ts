import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListNewsAuthorService from '@modules/news/services/ListNewsAuthorService';
import IFindAllNewsByUsernameAuhorDTO from '@modules/news/dtos/IFindAllNewsByUsernameAuhorDTO';

class NewsAuthorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { offset, limit } = request.query as IFindAllNewsByUsernameAuhorDTO;
    const listNewsAuthorService = container.resolve(ListNewsAuthorService);

    const news = await listNewsAuthorService.execute({
      username,
      offset,
      limit,
    });

    return response.json(news);
  }
}

export default NewsAuthorController;
