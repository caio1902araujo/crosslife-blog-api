import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAuthorAvatarService from '@modules/author/services/UpdateAuthorAvatarService';

class AuthorAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const filename = request.file?.filename || '';
    const updateAuthorAvatarService = container.resolve(
      UpdateAuthorAvatarService,
    );

    updateAuthorAvatarService.execute({
      authorId: request.author.id,
      categoryImage: 'authors',
      avatarFilename: filename,
    });

    return response.status(204).json();
  }
}

export default AuthorAvatarController;
