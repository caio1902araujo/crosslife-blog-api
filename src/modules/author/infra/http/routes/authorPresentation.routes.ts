import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthorPresentationController from '../controllers/AuthorPresentationController';

const authorPresentationRouter = Router();
const authorPresentationController = new AuthorPresentationController();

authorPresentationRouter.get(
  '/:username',
  celebrate({
    [Segments.PARAMS]: {
      username: Joi.string().required(),
    },
  }),
  authorPresentationController.show,
);

export default authorPresentationRouter;
