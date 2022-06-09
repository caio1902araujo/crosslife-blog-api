import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListNewsAuthorService from '@modules/news/services/ListNewsAuthorService';
import IFindAllNewsByAuhorDTO from '@modules/news/dtos/IFindAllNewsByAuhorDTO';

class NewsAuthorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { title, username, offset, limit } =
      request.query as IFindAllNewsByAuhorDTO;
    const listNewsAuthorService = container.resolve(ListNewsAuthorService);

    const news = await listNewsAuthorService.execute({
      title,
      username,
      offset,
      limit,
    });

    return response.json(news);
  }
}

export default NewsAuthorController;
