import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer'

import CreateStudentService from '@modules/student/services/CreateStudentService';
import ListStudentsService from '@modules/student/services/ListStudentsService';
import DeleteStudentService from '@modules/student/services/DeleteStudentService';
import IFindAllStudentDTO from '@modules/student/dtos/IFindAllStudentDTO';

class StudentController{
	public async create(request: Request, response: Response): Promise<Response>{
    const { name, cpf, telephone, email } = request.body;

    const createStudentService = container.resolve(CreateStudentService);
    const student = await createStudentService.execute({ name, email, cpf, telephone});
    request.body.id = student.id;

    return response.json(instanceToInstance(student));
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const { name, username, cpf, limit, offset } = request.query as IFindAllStudentDTO;

    const listStudentsService = container.resolve(ListStudentsService);
		const students = await listStudentsService.execute({ name, username, cpf, offset, limit });

    return response.json(instanceToInstance(students));
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const id = request.params.id as string;

    const deleteStudentService = container.resolve(DeleteStudentService);
    await deleteStudentService.execute(id);

    return response.status(204).json();
  }
}

export default StudentController;
