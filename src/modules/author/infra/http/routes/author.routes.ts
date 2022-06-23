import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthorController from '../controllers/AuthorController';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';

const authorRouter = Router();
const authorController = new AuthorController();

authorRouter.use(ensureValidToken, ensureValidAdmin);

authorRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
      username: Joi.string().default(''),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  authorController.index,
);

authorRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  authorController.delete,
);

authorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  authorController.create,
);

export default authorRouter;
