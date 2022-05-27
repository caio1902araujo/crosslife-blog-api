import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowStudentPhysicalEvaluationService from "@modules/physicalEvaluation/services/ShowStudentPhysicalEvaluationService";

class StudentPhysicalEvaluationController{
  public async show(request: Request, response: Response): Promise<Response>{
    const showStudentPhysicalEvaluationService = container.resolve(ShowStudentPhysicalEvaluationService);
    const id = request.student.id;

    const physicalEvaluation = await showStudentPhysicalEvaluationService.execute(id);
    return response.json(physicalEvaluation);
  }
};

export default StudentPhysicalEvaluationController;

