import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PhysicalEvaluationController from '../controllers/PhysicalEvaluationController';

import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';

const physicalEvaluationRouter = Router();
const physicalEvaluationController = new PhysicalEvaluationController();

physicalEvaluationRouter.use(ensureValidToken, ensureValidAdmin);

physicalEvaluationRouter.get('/',
celebrate({
  [Segments.QUERY]:{
    name: Joi.string().default(''),
    username: Joi.string().default(''),
    limit: Joi.number().default(10),
    offset: Joi.number().default(0)
  }
}),
physicalEvaluationController.index);

physicalEvaluationRouter.get('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i, )
  }
}),
physicalEvaluationController.show);

physicalEvaluationRouter.put(
	'/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i, )
    }
  }),
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
