import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowWorkoutService from '@modules/workout/services/ShowWorkoutService';
import CreateWorkoutService from '@modules/workout/services/CreateWorkoutService';
import DeleteWorkoutService from '@modules/workout/services/DeleteWorkoutService';
import ListWorkoutsService from '@modules/workout/services/ListWorkoutsService';
import UpdateWorkoutService from '@modules/workout/services/UpdateWorkoutService';
import IFindAllWorkoutsDTO from '@modules/workout/dtos/IFindAllWorkoutsDTO';

class WorkoutController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const showWorkout = container.resolve(ShowWorkoutService);
    const workout = await showWorkout.execute(id);

    return response.json(instanceToInstance(workout));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteWorkoutService = container.resolve(DeleteWorkoutService);
    await deleteWorkoutService.execute(id);

    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const trainerId = request.trainer.id;
    const { title, description, date, videoUrl } = request.body;

    const createWorkoutService = container.resolve(CreateWorkoutService);
    const workout = await createWorkoutService.execute({
      title,
      description,
      date,
      videoUrl,
      trainerId,
    });

    return response.json(instanceToInstance(workout));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const workoutId = request.params.id;
    const trainerId = request.trainer.id;
    const { title, description, date, videoUrl } = request.body;

    const updateWorkoutService = container.resolve(UpdateWorkoutService);
    const workout = await updateWorkoutService.execute({
      workoutId,
      title,
      description,
      date,
      videoUrl,
      trainerId,
    });

    return response.json(instanceToInstance(workout));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const trainerId = request.trainer.id;
    const { title, dateOrder, offset, limit } =
      request.query as IFindAllWorkoutsDTO;

    const listWorkoutsService = container.resolve(ListWorkoutsService);
    const workout = await listWorkoutsService.execute({
      trainerId,
      title,
      dateOrder,
      limit,
      offset,
    });

    return response.json(instanceToInstance(workout));
  }
}

export default WorkoutController;
