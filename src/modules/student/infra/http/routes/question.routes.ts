import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import QuestionController from '../controllers/QuestionController';

const questionRouter = Router();
const questionController = new QuestionController();

questionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      name: Joi.string().required(),
      question: Joi.string().required(),
    },
  }),
  questionController.create,
);

export default questionRouter;
