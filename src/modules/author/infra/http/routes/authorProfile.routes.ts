import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import AuthorProfileController from '../controllers/AuthorProfileController';
import AuthorAvatarController from '../controllers/AuthorAvatarController';
import ensureValidAuthor from '../middlewares/ensureValidAuthor';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';

import uploadConfig from '@config/upload';

const authorProfileRouter = Router();
const upload = multer(uploadConfig);
const authorProfileController = new AuthorProfileController();
const authorAvatarController = new AuthorAvatarController();

authorProfileRouter.use(ensureValidToken);
authorProfileRouter.use(ensureValidAuthor);

authorProfileRouter.get('/', authorProfileController.show);

authorProfileRouter.patch('/avatar', upload.single('avatar'), authorAvatarController.update);

authorProfileRouter.put(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string(),
      description: Joi.string(),
			username: Joi.string(),
			password: Joi.string(),
      oldPassword: Joi.string(),
			passwordConfirmation: Joi.string().valid(Joi.ref('password')),
		}
	}),
	authorProfileController.update
);

export default authorProfileRouter;
