import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import StudentController from '../controllers/StudentController';
import ensureValidAdmin from '@modules/admin/infra/http/middlewares/ensureValidAdmin';
import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';

const studentRouter = Router();
const studentController = new StudentController();

studentRouter.use(ensureValidToken, ensureValidAdmin);

studentRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().default(''),
      username: Joi.string().default(''),
      cpf: Joi.string().default(''),
      offset: Joi.number().default(0),
      limit: Joi.number().default(10),
    },
  }),
  studentController.index,
);

studentRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().regex(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      ),
    },
  }),
  studentController.delete,
);

studentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().email().required(),
      telephone: Joi.string().required(),
    },
  }),
  studentController.create,
);

export default studentRouter;
