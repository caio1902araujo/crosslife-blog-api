import { inject, injectable } from 'tsyringe';

import Workout from '../infra/typeorm/entities/Workout';

import IWorkoutRepository from '../repositories/IWorkoutRepository';

import AppError from '@shared/errors/AppError';

@injectable()
class ShowWorkoutService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,
  ) {}

  public async execute(id: string): Promise<Workout> {
    const workout = await this.workoutRepository.findById(id);

    if (!workout) {
      throw new AppError('Treino não encontrado.', 404);
    }

    return workout;
  }
}

export default ShowWorkoutService;
