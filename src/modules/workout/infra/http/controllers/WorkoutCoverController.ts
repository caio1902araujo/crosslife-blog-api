import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateWorkoutService from '@modules/workout/services/UpdateCoverService';

class WorkoutCoverController {
  public async update(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const filename = request.file?.filename || '';
    const updateWorkoutService = container.resolve(UpdateWorkoutService);

    updateWorkoutService.execute({
      workoutId: id,
      categoryImage: 'workouts',
      coverFilename: filename,
      trainerId: request.trainer.id,
    });

    return response.status(204).json();
  }
}

export default WorkoutCoverController;
