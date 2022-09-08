import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendQuestionService from '@modules/student/services/SendQuestionService';

class QuestionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, question } = request.body;

    const sendQuestionService = container.resolve(SendQuestionService);

    await sendQuestionService.execute({ email, name, question });

    return response.status(204).json();
  }
}

export default QuestionController;
