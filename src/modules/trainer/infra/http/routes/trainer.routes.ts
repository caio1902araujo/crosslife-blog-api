import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TrainerController from '../controllers/TrainerController';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';

const trainerRouter = Router();
const trainerController = new TrainerController();

trainerRouter.use(ensureValidToken, ensureValidAdmin);

trainerRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
      username: Joi.string().default(''),
      offset: Joi.number().default(0),
      limit: Joi.number().default(10),
    },
  }),
  trainerController.index,
);

trainerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      idTrainer: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  trainerController.delete,
);

trainerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      username: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
    },
  }),
  trainerController.create,
);

export default trainerRouter;
