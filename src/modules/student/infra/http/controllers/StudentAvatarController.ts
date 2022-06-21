import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateStudentAvatarService from '@modules/student/services/UpdateStudentAvatarService';

class StudentAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const filename = request.file?.filename || '';
    const updateStudentAvatarService = container.resolve(
      UpdateStudentAvatarService,
    );

    updateStudentAvatarService.execute({
      id: request.student.id,
      categoryImage: 'students',
      avatarFilename: filename,
    });

    return response.status(204).json();
  }
}

export default StudentAvatarController;
