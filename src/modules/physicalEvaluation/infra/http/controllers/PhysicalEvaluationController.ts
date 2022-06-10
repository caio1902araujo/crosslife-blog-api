import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePhysicalEvaluationService from '@modules/physicalEvaluation/services/UpdatePhysicalEvaluationService';
import ShowPhysicalEvaluationService from '@modules/physicalEvaluation/services/ShowPhysicalEvaluationService';
import ListPhysicalEvaluationsService from '@modules/physicalEvaluation/services/ListPhysicalEvaluationsService';
import IFindAllPhysicalEvaluationDTO from '@modules/physicalEvaluation/dtos/IFindAllPhysicalEvaluationDTO';

class PhysicalEvaluationController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      fatMass,
      leanMass,
      muscleMass,
      boneDensity,
      visceralFat,
      basalMetabolism,
      hydration,
    } = request.body;
    const { id } = request.params;

    const updatePhysicalEvaluationService = container.resolve(
      UpdatePhysicalEvaluationService,
    );

    const physicalEvaluation = await updatePhysicalEvaluationService.execute({
      id,
      fatMass,
      leanMass,
      muscleMass,
      boneDensity,
      visceralFat,
      basalMetabolism,
      hydration,
    });

    return response.json(physicalEvaluation);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showPhysicalEvaluationService = container.resolve(
      ShowPhysicalEvaluationService,
    );
    const physicalEvaluation = await showPhysicalEvaluationService.execute(id);

    return response.json(physicalEvaluation);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name, username, limit, offset } =
      request.query as IFindAllPhysicalEvaluationDTO;

    const listPhysicalEvaluationsService = container.resolve(
      ListPhysicalEvaluationsService,
    );
    const physicalEvaluations = await listPhysicalEvaluationsService.execute({
      name,
      username,
      offset,
      limit,
    });

    return response.json(physicalEvaluations);
  }
}

export default PhysicalEvaluationController;
