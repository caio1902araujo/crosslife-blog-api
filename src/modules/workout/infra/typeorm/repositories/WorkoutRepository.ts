import { getRepository, Repository, ILike, Between } from 'typeorm';

import Workout from '../entities/Workout';

import IWorkoutRepository from '@modules/workout/repositories/IWorkoutRepository';
import ICreateWorkoutDTO from '@modules/workout/dtos/ICreateWorkoutDTO';
import IFindAllWorkoutsDTO from '@modules/workout/dtos/IFindAllWorkoutsDTO';
import IFindAllWorkoutsOfTheWeekDTO from '@modules/workout/dtos/IFindAllWorkoutsOfTheWeekDTO';

class WorkoutRepository implements IWorkoutRepository {
  private ormRepository: Repository<Workout>;

  constructor() {
    this.ormRepository = getRepository(Workout);
  }

  public async delete(id: string) {
    await this.ormRepository.delete(id);
  }

  public async findAllWorkoutsOfTheWeek({
    startDate,
    endDate,
  }: IFindAllWorkoutsOfTheWeekDTO): Promise<Workout[]> {
    const workouts = await this.ormRepository
      .createQueryBuilder('workout')
      .leftJoinAndSelect('workout.trainer', 'trainer')
      .where('workout.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .select([
        'workout.id',
        'workout.title',
        'workout.description',
        'workout.date',
        'workout.video_url',
        'trainer.name',
      ])
      .orderBy('date', 'ASC')
      .getMany();

    return workouts;
  }

  public async findAllWorkouts({
    trainer_id,
    title,
    dateOrder,
    offset,
    limit,
  }: IFindAllWorkoutsDTO): Promise<Workout[]> {
    const workouts = await this.ormRepository.find({
      where: {
        title: ILike('%' + title + '%'),
        trainer_id: trainer_id,
      },
      order: { date: dateOrder },
      take: limit,
      skip: offset,
    });

    return workouts;
  }

  public async findById(id: string): Promise<Workout | undefined> {
    const findWorkout = await this.ormRepository.findOne({
      where: { id },
    });

    return findWorkout;
  }

  public async create(workoutData: ICreateWorkoutDTO): Promise<Workout> {
    const workout = this.ormRepository.create(workoutData);

    await this.ormRepository.save(workout);

    return workout;
  }

  public async save(workout: Workout): Promise<Workout> {
    return await this.ormRepository.save(workout);
  }
}

export default WorkoutRepository;
