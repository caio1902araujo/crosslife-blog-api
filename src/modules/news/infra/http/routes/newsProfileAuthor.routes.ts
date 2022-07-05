import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import NewsProfileAuthorController from '../controllers/NewsProfileAuthorController';
import NewsCoverController from '../controllers/NewsCoverController';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAuthor from '@modules/author/infra/http/middlewares/ensureValidAuthor';

import uploadConfig from '@config/upload';

const newsProfileAuthorRouter = Router();
const upload = multer(uploadConfig);
const newsProfileAuthorController = new NewsProfileAuthorController();
const newsCoverController = new NewsCoverController();

newsProfileAuthorRouter.use(ensureValidToken, ensureValidAuthor);

newsProfileAuthorRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string().default(''),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  newsProfileAuthorController.index,
);

newsProfileAuthorRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  newsProfileAuthorController.show,
);

newsProfileAuthorRouter.patch(
  '/cover/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  upload.single('cover'),
  newsCoverController.update,
);

newsProfileAuthorRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  newsProfileAuthorController.delete,
);

newsProfileAuthorRouter.put(
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
      subtitle: Joi.string(),
      body: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  newsProfileAuthorController.update,
);

newsProfileAuthorRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      subtitle: Joi.string(),
      body: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  newsProfileAuthorController.create,
);

export default newsProfileAuthorRouter;
