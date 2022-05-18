import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer'

import CreateTrainerService from '@modules/trainer/services/CreateTrainerService';
import ListTrainersService from '@modules/trainer/services/ListTrainersService';
import DeleteTrainerService from '@modules/trainer/services/DeleteTrainerService';
import IFindAllTrainerDTO from '@modules/trainer/dtos/IFindAllTrainerDTO';

class TrainerController{
	public async create(request: Request, response: Response): Promise<Response>{
    const { name, username, password, email } = request.body;

    const createTrainerProfile = container.resolve(CreateTrainerService);
    const trainer = await createTrainerProfile.execute({ name, email, username, password});

    return response.json(instanceToInstance(trainer));
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const {name, username, order} = request.query;
    const limit = parseInt(request.query.limit as string);
    const offset = parseInt(request.query.offset as string);

		const listTrainersService = container.resolve(ListTrainersService);
		const trainers = await listTrainersService.execute({ name, username, limit, offset, order} as IFindAllTrainerDTO);

		return response.json(instanceToInstance(trainers));
	}

  public async delete(request: Request, response: Response): Promise<Response>{
    const id = request.params.id as string;
    const deleteTrainerService = container.resolve(DeleteTrainerService);
    await deleteTrainerService.execute(id);

    return response.status(204).json();
  }
}

export default TrainerController;
