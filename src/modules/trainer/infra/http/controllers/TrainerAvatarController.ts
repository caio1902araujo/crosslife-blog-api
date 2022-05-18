import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateTrainerAvatarService from '@modules/trainer/services/UpdateTrainerAvatarService';

class TrainerAvatarController{
	public async update(request: Request, response: Response): Promise<Response>{
		const filename = request.file?.filename || '';
		const updateTrainerAvatarService = container.resolve(UpdateTrainerAvatarService);

		updateTrainerAvatarService.execute({
			trainerId: request.trainer.id,
      categoryImage: 'trainers',
			avatarFilename: filename,
		});

		return response.json({ok: 'json'});
	}
}

export default TrainerAvatarController;
