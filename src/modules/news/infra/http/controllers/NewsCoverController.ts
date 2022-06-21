import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCoverNewsService from '@modules/news/services/UpdateCoverNewsService';

class NewsCoverController {
  public async update(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const filename = request.file?.filename || '';
    const updateCoverNewsService = container.resolve(UpdateCoverNewsService);

    await updateCoverNewsService.execute({
      newsId: id,
      categoryImage: 'news',
      coverFilename: filename,
      authorId: request.author.id,
    });

    return response.status(204).json();
  }
}

export default NewsCoverController;
