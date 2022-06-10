import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowStudentPhysicalEvaluationService from '@modules/physicalEvaluation/services/ShowStudentPhysicalEvaluationService';

class StudentPhysicalEvaluationController {
  public async show(request: Request, response: Response): Promise<Response> {
    const studentId = request.student.id;
    const showStudentPhysicalEvaluationService = container.resolve(
      ShowStudentPhysicalEvaluationService,
    );

    const physicalEvaluation =
      await showStudentPhysicalEvaluationService.execute(studentId);

    return response.json(physicalEvaluation);
  }
}

export default StudentPhysicalEvaluationController;
