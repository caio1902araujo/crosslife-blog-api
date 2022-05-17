import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'

import SessionsAdminController from '../controllers/SessionsAdminController';

const sessionsAdminRouter = Router();
const sessionsAdminController = new SessionsAdminController()

sessionsAdminRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			username: Joi.string().required(),
			password: Joi.string().required(),
		}
	}),
	sessionsAdminController.create
);

export default sessionsAdminRouter;
