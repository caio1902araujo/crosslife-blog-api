import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListWorkoutsOfTheWeekService from '@modules/workout/services/ListWorkoutsOfTheWeekService';

class WorkoutsOfTheWeekController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listWorkoutsOfTheWeekService = container.resolve(
      ListWorkoutsOfTheWeekService,
    );

    const workouts = await listWorkoutsOfTheWeekService.execute();

    return response.json(workouts);
  }
}

export default WorkoutsOfTheWeekController;
