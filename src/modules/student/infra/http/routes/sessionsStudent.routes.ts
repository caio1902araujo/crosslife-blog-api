import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'

import SessionsStudentController from '../controllers/SessionsStudentController';

const sessionsStudentRouter = Router();
const sessionsStudentController = new SessionsStudentController();

sessionsStudentRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			username: Joi.string().required(),
			password: Joi.string().required(),
		}
	}),
	sessionsStudentController.create
);

export default sessionsStudentRouter;
