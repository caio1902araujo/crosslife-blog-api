import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'

import SessionsAuthorController from '../controllers/SessionsAuthorController';

const sessionsAuthorRouter = Router();
const sessionsAuthorController = new SessionsAuthorController();

sessionsAuthorRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			username: Joi.string().required(),
			password: Joi.string().required(),
		}
	}),
	sessionsAuthorController.create
);

export default sessionsAuthorRouter;
