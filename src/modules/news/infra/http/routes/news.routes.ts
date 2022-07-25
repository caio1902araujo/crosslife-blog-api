import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import NewsController from '../controllers/NewsController';

const newsRouter = Router();

const newsController = new NewsController();

newsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string().default(''),
      category: Joi.string(),
      usernameAuthor: Joi.string(),
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

export default newsRouter;
