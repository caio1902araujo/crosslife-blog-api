import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListNewsMostAccessedService from '@modules/news/services/ListNewsMostAccessedService';
import UpdateNewsMostAccessedService from '@modules/news/services/UpdateNewsMostAccessedService';

class NewsMostAccessedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listNewsMostAccessedService = container.resolve(
      ListNewsMostAccessedService,
    );

    const news = await listNewsMostAccessedService.execute();

    return response.json(news);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const title = request.params.title;
    const updateNewsMostAccessedService = container.resolve(
      UpdateNewsMostAccessedService,
    );

    await updateNewsMostAccessedService.execute(title);

    return response.status(204).json();
  }
}

export default NewsMostAccessedController;
