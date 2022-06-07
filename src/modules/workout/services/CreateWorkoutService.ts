import { injectable, inject } from 'tsyringe';

import Workout from '../infra/typeorm/entities/Workout';

import IWorkoutRepository from '../repositories/IWorkoutRepository';
import ICreateWorkoutDTO from '../dtos/ICreateWorkoutDTO';
import { getHours, isBefore } from 'date-fns';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateWorkoutService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,
  ) {}

  public async execute({
    title,
    description,
    date,
    video_url,
    trainer_id,
  }: ICreateWorkoutDTO): Promise<Workout> {
    if (isBefore(date, Date.now())) {
      throw new AppError(
        'Você não pode escolher uma data que ja passou para um treino.',
        400,
      );
    }
    console.log(date.getHours());
    if (getHours(date) < 8 || getHours(date) >= 18) {
      throw new AppError('Você so agendar treinos entre as 8hrs até as 17hrs');
    }

    const workout = this.workoutRepository.create({
      title,
      description,
      date,
      video_url,
      trainer_id,
    });

    return workout;
  }
}

export default CreateWorkoutService;
