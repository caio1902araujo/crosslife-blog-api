import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer'

import UpdateStudentProfileService from '@modules/student/services/UpdateStudentProfileService';
import ShowStudentProfileService from '@modules/student/services/ShowStudentProfileService';

class StudentProfileController{
	public async show(request: Request, response: Response): Promise<Response>{
		const studentId = request.student.id;
		const showStudentProfileService = container.resolve(ShowStudentProfileService);
		const student = await showStudentProfileService.execute(studentId);

		return response.json(instanceToInstance(student));
	}

  public async update(request: Request, response: Response): Promise<Response>{
    const studentId = request.student.id;
		const { name, username, password, email, oldPassword, telephone } = request.body;

		const updateStudentProfileService = container.resolve(UpdateStudentProfileService);
		const student = await updateStudentProfileService.execute({ studentId, telephone, name, username, password, email, oldPassword });

		return response.json(instanceToInstance(student));
	}
}

export default StudentProfileController;
