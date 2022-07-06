import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import NewsController from '../controllers/NewsController';
import NewsAuthorController from '../controllers/NewsAuthorController';

const newsRouter = Router();

const newsController = new NewsController();
const newsAuthorController = new NewsAuthorController();

newsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string().default(''),
      category: Joi.string(),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  newsController.index,
);

newsRouter.get(
  '/:title',
  celebrate({
    [Segments.PARAMS]: {
      title: Joi.string(),
    },
  }),
  newsController.show,
);

newsRouter.get(
  '/author/:username',
  celebrate({
    [Segments.PARAMS]: {
      username: Joi.string().required(),
    },
    [Segments.QUERY]: {
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  newsAuthorController.index,
);

export default newsRouter;
