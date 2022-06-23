import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAuthorPresentationService from '@modules/author/services/ShowAuthorPresentationService';

class AuthorPresentationController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const showAuthorPresentationService = container.resolve(
      ShowAuthorPresentationService,
    );
    const authorPresentation = await showAuthorPresentationService.execute(
      username as string,
    );

    return response.json(authorPresentation);
  }
}

export default AuthorPresentationController;
