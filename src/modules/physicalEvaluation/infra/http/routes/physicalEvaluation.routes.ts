import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PhysicalEvaluationController from '../controllers/PhysicalEvaluationController';

import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';

const physicalEvaluationRouter = Router();
const physicalEvaluationController = new PhysicalEvaluationController();

physicalEvaluationRouter.use(ensureValidToken, ensureValidAdmin);

physicalEvaluationRouter.get('/', physicalEvaluationController.index);

physicalEvaluationRouter.get('/:id', physicalEvaluationController.show);

physicalEvaluationRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
      fat_mass: Joi.number(),
      lean_mass: Joi.number(),
      muscle_mass: Joi.number(),
      bone_density: Joi.number(),
      visceral_fat: Joi.number(),
      basal_metabolism: Joi.number(),
      hydration: Joi.number(),
		}
	}),
	physicalEvaluationController.update
);

export default physicalEvaluationRouter;
