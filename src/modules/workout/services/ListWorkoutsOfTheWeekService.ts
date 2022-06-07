import { isMonday, nextMonday, previousMonday } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Workout from '../infra/typeorm/entities/Workout';
import IWorkoutRepository from '../repositories/IWorkoutRepository';

@injectable()
class ListWorkoutsOfTheWeekService {
  constructor(
    @inject('WorkoutRepository')
    private workoutRepository: IWorkoutRepository,
  ) {}

  public async execute(): Promise<Workout[]> {
    const currentDate = new Date();

    const startDate = isMonday(currentDate)
      ? currentDate
      : previousMonday(currentDate);

    const endDate = nextMonday(currentDate);

    const wourkouts = await this.workoutRepository.findAllWorkoutsOfTheWeek({
      startDate,
      endDate,
    });

    return wourkouts;
  }
}

export default ListWorkoutsOfTheWeekService;
