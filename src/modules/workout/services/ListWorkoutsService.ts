import { inject, injectable } from 'tsyringe';

import Workout from '../infra/typeorm/entities/Workout';

import IWorkoutRepository from '../repositories/IWorkoutRepository';
import IFindAllWorkoutDTO from '../dtos/IFindAllWorkoutsDTO';

@injectable()
class ListWorkoutsService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,
  ) {}

  public async execute({
    trainer_id,
    title,
    dateOrder,
    limit,
    offset,
  }: IFindAllWorkoutDTO): Promise<Workout[]> {
    const workouts = await this.workoutRepository.findAllWorkouts({
      trainer_id,
      title,
      dateOrder,
      limit,
      offset,
    });

    return workouts;
  }
}

export default ListWorkoutsService;
