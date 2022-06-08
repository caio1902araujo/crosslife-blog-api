import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import NewsAuthorController from '../controllers/NewsAuthorController';

const newsAuthorRouter = Router();
const newsAuthorController = new NewsAuthorController();

newsAuthorRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string().default(''),
      username: Joi.string(),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  newsAuthorController.index,
);

export default newsAuthorRouter;
