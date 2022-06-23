import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IWorkoutRepository from '../repositories/IWorkoutRepository';

@injectable()
class DeleteWorkoutService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,
  ) {}

  public async execute(id: string, trainerId: string): Promise<void> {
    const workout = await this.workoutRepository.findById(id);

    if (!workout) {
      throw new AppError('Treino não encontrado', 404);
    }

    if (workout.trainerId !== trainerId) {
      throw new AppError(
        'Esse usuário não tem permissão para fazer alterações nesse treino',
        403,
      );
    }

    await this.workoutRepository.delete(id);
  }
}

export default DeleteWorkoutService;
