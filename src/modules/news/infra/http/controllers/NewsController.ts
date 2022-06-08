import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowNewsService from '@modules/news/services/ShowNewsService';
import CreateNewsService from '@modules/news/services/CreateNewsService';
import DeleteNewsService from '@modules/news/services/DeleteNewsService';
import ListNewsService from '@modules/news/services/ListNewsService';
import UpdateNewsService from '@modules/news/services/UpdateNewsService';
import IFindAllNewsDTO from '@modules/news/dtos/IFindAllNewsDTO';

class NewsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const showNews = container.resolve(ShowNewsService);
    const news = await showNews.execute(id);

    return response.json(instanceToInstance(news));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteNewsService = container.resolve(DeleteNewsService);
    await deleteNewsService.execute(id);

    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const author_id = request.author.id;
    const { title, subtitle, body, category } = request.body;

    const createNewsService = container.resolve(CreateNewsService);
    const news = await createNewsService.execute({
      title,
      subtitle,
      body,
      category,
      author_id,
    });

    return response.json(instanceToInstance(news));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const newsId = request.params.id;
    const author_id = request.author.id;
    const { title, subtitle, body, category } = request.body;

    const updateNewsService = container.resolve(UpdateNewsService);
    const news = await updateNewsService.execute({
      newsId,
      title,
      subtitle,
      body,
      category,
      author_id,
    });

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

    return response.json(instanceToInstance(news));
  }
}

export default NewsController;
