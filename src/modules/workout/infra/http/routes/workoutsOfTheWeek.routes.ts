import { Router } from 'express';

import WorkoutsOfTheWeekController from '../controllers/WorkoutsOfTheWeekController';

const workoutsOfTheWeekRouter = Router();
const workoutsOfTheWeekController = new WorkoutsOfTheWeekController();

workoutsOfTheWeekRouter.get('/', workoutsOfTheWeekController.index);

export default workoutsOfTheWeekRouter;
