import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsTrainerController from '../controllers/SessionsTrainerController';

const sessionsTrainerRouter = Router();
const sessionsTrainerController = new SessionsTrainerController();

sessionsTrainerRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			username: Joi.string().required(),
			password: Joi.string().required(),
		}
	}),
	sessionsTrainerController.create
);

export default sessionsTrainerRouter;
