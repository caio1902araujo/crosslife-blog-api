import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import NewsController from '../controllers/NewsController';
import NewsCoverController from '../controllers/NewsCoverController';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidAuthor from '@modules/author/infra/http/middlewares/ensureValidAuthor';

import uploadConfig from '@config/upload';

const newsRouter = Router();
const upload = multer(uploadConfig);
const newsController = new NewsController();
const newsCoverController = new NewsCoverController();

newsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string().default(''),
      limit: Joi.number().default(10),
      offset: Joi.number().default(0),
    },
  }),
  newsController.index,
);

newsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  newsController.show,
);

newsRouter.use(ensureValidToken, ensureValidAuthor);

newsRouter.patch(
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

newsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  newsController.delete,
);

newsRouter.put(
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
  newsController.update,
);

newsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      subtitle: Joi.string(),
      body: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  newsController.create,
);

export default newsRouter;
