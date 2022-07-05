import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

import ShowNewsByIdService from '@modules/news/services/ShowNewsByIdService';
import CreateNewsService from '@modules/news/services/CreateNewsService';
import DeleteNewsService from '@modules/news/services/DeleteNewsService';
import UpdateNewsService from '@modules/news/services/UpdateNewsService';
import ListNewsByIdAuthorService from '@modules/news/services/ListNewsByIdAuthorService';

import IFindAllNewsByIdAuhorDTO from '@modules/news/dtos/IFindAllNewsByIdAuhorDTO';

class NewsProfileAuthorController {
  public async index(request: Request, response: Response): Promise<Response> {
    const authorId = request.author.id;
    const { title, offset, limit } = request.query as IFindAllNewsByIdAuhorDTO;
    const listNewsByIdAuthorService = container.resolve(
      ListNewsByIdAuthorService,
    );

    const news = await listNewsByIdAuthorService.execute({
      authorId,
      title,
      offset,
      limit,
    });

    return response.json(instanceToInstance(news));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const authorId = request.author.id;
    const newsId = request.params.id;

    const showNewsByIdService = container.resolve(ShowNewsByIdService);

    const news = await showNewsByIdService.execute({ authorId, newsId });

    return response.json(instanceToInstance(news));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const authorId = request.author.id;
    const deleteNewsService = container.resolve(DeleteNewsService);
    await deleteNewsService.execute(id, authorId);

    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const authorId = request.author.id;
    const { title, subtitle, body, category } = request.body;

    const createNewsService = container.resolve(CreateNewsService);
    const news = await createNewsService.execute({
      title,
      subtitle,
      body,
      category,
      authorId,
    });

    return response.json(instanceToInstance(news));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const newsId = request.params.id;
    const authorId = request.author.id;
    const { title, subtitle, body, category } = request.body;

    const updateNewsService = container.resolve(UpdateNewsService);
    const news = await updateNewsService.execute({
      newsId,
      title,
      subtitle,
      body,
      category,
      authorId,
    });

    return response.json(instanceToInstance(news));
  }
}

export default NewsProfileAuthorController;
