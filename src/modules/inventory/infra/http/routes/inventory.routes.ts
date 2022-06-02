import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import InventoryController from '../controllers/InventoryController';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';

const inventoryRouter = Router();
const inventoryController = new InventoryController();

inventoryRouter.use(ensureValidToken, ensureValidAdmin);

inventoryRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  inventoryController.show,
);

inventoryRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      product: Joi.string().default(''),
      quantityOrder: Joi.string(),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  inventoryController.index,
);

inventoryRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  inventoryController.delete,
);

inventoryRouter.put(
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
      product: Joi.string().required(),
      quantity: Joi.number().required(),
      note: Joi.string().required(),
    },
  }),
  inventoryController.update,
);

inventoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product: Joi.string().required(),
      quantity: Joi.number().required(),
      note: Joi.string().required(),
    },
  }),
  inventoryController.create,
);

export default inventoryRouter;
