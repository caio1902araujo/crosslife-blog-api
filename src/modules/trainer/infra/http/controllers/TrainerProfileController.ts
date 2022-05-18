import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer'

import UpdateTrainerProfileService from '@modules/trainer/services/UpdateTrainerProfileService';
import ShowTrainerProfileService from '@modules/trainer/services/ShowTrainerProfileService';

class TrainerProfileController{
	public async show(request: Request, response: Response): Promise<Response>{
		const trainerId = request.author.id;
		const showTrainerProfile = container.resolve(ShowTrainerProfileService);
		const trainer = await showTrainerProfile.execute(trainerId);

		return response.json(instanceToInstance(trainer));
	}

  public async update(request: Request, response: Response): Promise<Response>{
    const trainerId = request.trainer.id;
		const { name, username, password, email, oldPassword } = request.body;

		const updateTrainerProfile = container.resolve(UpdateTrainerProfileService);
		const trainer = await updateTrainerProfile.execute({ trainerId, name, username, password, email, oldPassword });

		return response.json(instanceToInstance(trainer));
	}
}

export default TrainerProfileController;
