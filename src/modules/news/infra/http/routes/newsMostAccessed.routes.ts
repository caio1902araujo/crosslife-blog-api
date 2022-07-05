import { Router } from 'express';

import NewsMostAccessedController from '../controllers/NewsMostAccessedController';

const newsMostAccessedRouter = Router();
const newsMostAccessedController = new NewsMostAccessedController();

newsMostAccessedRouter.get('/', newsMostAccessedController.index);

export default newsMostAccessedRouter;
