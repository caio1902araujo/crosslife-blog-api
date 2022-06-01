import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MatriculationController from '../controllers/MatriculationController';

import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';
import { JoinColumn } from 'typeorm';

const matriculationRouter = Router();
const matriculationController = new MatriculationController();

matriculationRouter.use(ensureValidToken, ensureValidAdmin);

matriculationRouter.get('/',
  celebrate({
    [Segments.QUERY]:{
      active: Joi.boolean(),
      type: Joi.string(),
      orderCreatedAt: Joi.string().default('DESC'),
      username: Joi.string().default(''),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0)
    }
  }),
 matriculationController.index
);

matriculationRouter.get('/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i, )
    }
  }),
  matriculationController.show
);

matriculationRouter.put(
	'/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i, )
    }
  }),
	celebrate({
		[Segments.BODY]: {
      active: Joi.boolean(),
      type: Joi.string(),
      finished_at: Joi.date(),
		}
	}),
	matriculationController.update
);

export default matriculationRouter;
