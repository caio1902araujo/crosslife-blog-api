import { Router } from 'express';

import StudentPhysicalEvaluationController from '../controllers/StudentPhysicalEvaluationController';

import ensureValidToken from '@shared/infra/http/middlewares/ensureValidToken';
import ensureValidStudent from '@modules/student/infra/http/middlewares/ensureValidStudent';

const studentPhysicalEvaluationRouter = Router();
const studentPhysicalEvaluationController = new StudentPhysicalEvaluationController();

studentPhysicalEvaluationRouter.use(ensureValidToken, ensureValidStudent)

studentPhysicalEvaluationRouter.get('/', studentPhysicalEvaluationController.show);

export default studentPhysicalEvaluationRouter;
