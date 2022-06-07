import { injectable, inject } from 'tsyringe';

import Workout from '../infra/typeorm/entities/Workout';

import IWorkoutRepository from '../repositories/IWorkoutRepository';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  workoutId: string;
  categoryImage: string;
  coverFilename: string;
  trainerId: string;
}

@injectable()
class UpdateWorkoutService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    workoutId,
    categoryImage,
    coverFilename,
    trainerId,
  }: IRequest): Promise<Workout> {
    const workout = await this.workoutRepository.findById(workoutId);

    if (!workout) {
      throw new AppError('Esse treino não existe', 401);
    }

    if (workout.trainer_id !== trainerId) {
      throw new AppError(
        'Esse usuário não tem permissão para fazer alterações nesse treino',
        400,
      );
    }

    if (workout.cover) {
      this.storageProvider.deleteFile({ categoryImage, file: workout.cover });
    }

    const fileName = await this.storageProvider.saveFile({
      categoryImage,
      file: coverFilename,
    });

    workout.cover = fileName;
    this.workoutRepository.save(workout);

    return workout;
  }
}

export default UpdateWorkoutService;
