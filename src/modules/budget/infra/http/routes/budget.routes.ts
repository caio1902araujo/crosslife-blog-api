import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import BudgetController from '../controllers/BudgetController';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';

const budgetRouter = Router();
const budgetController = new BudgetController();

budgetRouter.use(ensureValidToken, ensureValidAdmin);

budgetRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  budgetController.show,
);

budgetRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      expense: Joi.string().default(''),
      paydayOrder: Joi.string(),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  budgetController.index,
);

budgetRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  budgetController.delete,
);

budgetRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      expense: Joi.string().required(),
      value: Joi.number().required(),
      payday: Joi.date().required(),
      observation: Joi.string().required(),
    },
  }),
  budgetController.update,
);

budgetRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      expense: Joi.string().required(),
      value: Joi.number().required(),
      payday: Joi.date().required(),
      observation: Joi.string().required(),
    },
  }),
  budgetController.create,
);

export default budgetRouter;
