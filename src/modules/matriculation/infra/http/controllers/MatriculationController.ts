import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateMatriculationService from '@modules/matriculation/services/UpdateMatriculationService';
import ShowMatriculationService from '@modules/matriculation/services/ShowMatriculationService';
import ListMatriculationsService from '@modules/matriculation/services/ListMatriculationsService';
import IFindAllMatriculationsDTO from '@modules/matriculation/dtos/IFindAllMatriculationsDTO';

class MatriculationController{

  public async update(request: Request, response: Response): Promise<Response>{
    const { active, type, finished_at } = request.body;
    const { id } = request.params;

    const updateMatriculationService = container.resolve(UpdateMatriculationService);

    const matriculation =  await updateMatriculationService.execute({
      matriculationId: id,
      active,
      type,
      finished_at,
    });

    return response.json(matriculation);
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const showMatriculationService = container.resolve(ShowMatriculationService);
    const matriculation = await showMatriculationService.execute(id);

    return response.json(matriculation);
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const {  type, orderCreatedAt, username, active, limit, offset } = request.query as IFindAllMatriculationsDTO;

    const listMatriculationsService = container.resolve(ListMatriculationsService);
		const matriculations = await listMatriculationsService.execute({ active, type, orderCreatedAt, username, offset, limit});

    return response.json(matriculations);
  }
}

export default MatriculationController;
