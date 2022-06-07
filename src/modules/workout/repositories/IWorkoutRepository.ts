import Workout from '../infra/typeorm/entities/Workout';
import ICreateWorkoutDTO from '../dtos/ICreateWorkoutDTO';
import IFindAllWorkoutsDTO from '../dtos/IFindAllWorkoutsDTO';
import IFindAllWorkoutsOfTheWeekDTO from '../dtos/IFindAllWorkoutsOfTheWeekDTO';

interface IWorkoutRepository {
  findAllWorkouts(data: IFindAllWorkoutsDTO): Promise<Workout[]>;
  findAllWorkoutsOfTheWeek(
    rangeDate: IFindAllWorkoutsOfTheWeekDTO,
  ): Promise<Workout[]>;
  findById(id: string): Promise<Workout | undefined>;
  delete(id: string): Promise<void>;
  create(data: ICreateWorkoutDTO): Promise<Workout>;
  save(budget: Workout): Promise<Workout>;
}

export default IWorkoutRepository;
