import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowNewsByTitleService from '@modules/news/services/ShowNewsByTitleService';
import ListNewsService from '@modules/news/services/ListNewsService';
import IFindAllNewsDTO from '@modules/news/dtos/IFindAllNewsDTO';

class NewsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const title = request.params.title;
    const showNewsByTitleService = container.resolve(ShowNewsByTitleService);
    const news = await showNewsByTitleService.execute(title);

    return response.json(instanceToInstance(news));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { title, offset, limit } = request.query as IFindAllNewsDTO;

    const listNewsService = container.resolve(ListNewsService);
    const news = await listNewsService.execute({
      title,
      limit,
      offset,
    });

    return response.json(news);
  }
}

export default NewsController;
