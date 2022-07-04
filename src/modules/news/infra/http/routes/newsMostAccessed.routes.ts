import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import NewsMostAccessedController from '../controllers/NewsMostAccessedController';

const newsMostAccessedRouter = Router();
const newsMostAccessedController = new NewsMostAccessedController();

newsMostAccessedRouter.get('/', newsMostAccessedController.index);

newsMostAccessedRouter.patch(
  '/:title',
  celebrate({
    [Segments.PARAMS]: {
      title: Joi.string(),
    },
  }),
  newsMostAccessedController.update,
);

export default newsMostAccessedRouter;
