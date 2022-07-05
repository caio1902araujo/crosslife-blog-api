import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListNewsMostAccessedService from '@modules/news/services/ListNewsMostAccessedService';

class NewsMostAccessedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listNewsMostAccessedService = container.resolve(
      ListNewsMostAccessedService,
    );

    const news = await listNewsMostAccessedService.execute();

    return response.json(news);
  }
}

export default NewsMostAccessedController;
