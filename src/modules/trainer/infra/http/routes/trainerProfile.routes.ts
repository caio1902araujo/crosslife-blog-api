import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import TrainerProfileController from '../controllers/TrainerProfileController';
import TrainerAvatarController from '../controllers/TrainerAvatarController';
import ensureValidTrainer from '../middlewares/ensureValidTrainer';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';

import uploadConfig from '@config/upload';

const trainerProfileRouter = Router();
const upload = multer(uploadConfig);
const trainerProfileController = new TrainerProfileController();
const trainerAvatarController = new TrainerAvatarController();

trainerProfileRouter.use(ensureValidToken, ensureValidTrainer);

trainerProfileRouter.get('/', trainerProfileController.show);

trainerProfileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  trainerAvatarController.update,
);

trainerProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
      username: Joi.string(),
      password: Joi.string(),
      oldPassword: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  trainerProfileController.update,
);

export default trainerProfileRouter;
