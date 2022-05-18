import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import StudentProfileController from '../controllers/StudentProfileController';
import StudentAvatarController from '../controllers/StudentAvatarController';
import ensureValidStudent from '../middlewares/ensureValidStudent';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';

import uploadConfig from '@config/upload';

const studentProfileRouter = Router();
const upload = multer(uploadConfig);
const studentProfileController = new StudentProfileController();
const studentAvatarController = new StudentAvatarController();

studentProfileRouter.use(ensureValidToken);
studentProfileRouter.use(ensureValidStudent);

studentProfileRouter.get('/', studentProfileController.show);

studentProfileRouter.patch('/avatar', upload.single('avatar'), studentAvatarController.update);

studentProfileRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string(),
      email: Joi.string().email(),
      telephone: Joi.string(),
			username: Joi.string(),
			password: Joi.string(),
      oldPassword: Joi.string(),
			passwordconfirmation: Joi.string().valid(Joi.ref('password')),
		}
	}),
	studentProfileController.update
);

export default studentProfileRouter;
