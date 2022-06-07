import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import WorkoutController from '../controllers/WorkoutController';
import WorkoutCoverController from '../controllers/WorkoutCoverController';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidTrainer from '@modules/trainer/infra/http/middlewares/ensureValidTrainer';

import uploadConfig from '@config/upload';

const workoutRouter = Router();
const upload = multer(uploadConfig);
const workoutController = new WorkoutController();
const workoutCoverController = new WorkoutCoverController();

workoutRouter.use(ensureValidToken, ensureValidTrainer);

workoutRouter.patch(
  '/cover/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  upload.single('cover'),
  workoutCoverController.update,
);

workoutRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  workoutController.show,
);

workoutRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string().default(''),
      dateOrder: Joi.string(),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  workoutController.index,
);

workoutRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  workoutController.delete,
);

workoutRouter.put(
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
      title: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      video_url: Joi.string().required(),
    },
  }),
  workoutController.update,
);

workoutRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.date().required(),
      video_url: Joi.string(),
    },
  }),
  workoutController.create,
);

export default workoutRouter;
