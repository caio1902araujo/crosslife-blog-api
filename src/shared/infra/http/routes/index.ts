import { Router } from 'express';

import passwordRouter from '@modules/student/infra/http/routes/password.routes';

import sessionsAdminRouter from '@modules/admin/infra/http/routes/sessions.routes';

import authorRouter from '@modules/author/infra/http/routes/author.routes';
import sessionsAuthorRouter from '@modules/author/infra/http/routes/sessionsAuthor.routes';
import authorProfileRouter from '@modules/author/infra/http/routes/authorProfile.routes';

import trainerRouter from '@modules/trainer/infra/http/routes/trainer.routes';
import sessionsTrainerRouter from '@modules/trainer/infra/http/routes/sessionsTrainer.routes';
import trainerProfileRouter from '@modules/trainer/infra/http/routes/trainerProfile.routes';

import studentRouter from '@modules/student/infra/http/routes/student.routes';
import sessionsStudentRouter from '@modules/student/infra/http/routes/sessionsStudent.routes';
import studentProfileRouter from '@modules/student/infra/http/routes/studentProfile.routes';

import physicalEvaluationRouter from '@modules/physicalEvaluation/infra/http/routes/physicalEvaluation.routes';
import studentPhysicalEvaluationRouter from '@modules/physicalEvaluation/infra/http/routes/studentPhysicalEvaluation.routes';

import matriculationRouter from '@modules/matriculation/infra/http/routes/matriculation.routes';

const routes = Router();

routes.use('/sessions/admin', sessionsAdminRouter);

routes.use('/author', authorRouter);
routes.use('/sessions/author', sessionsAuthorRouter);
routes.use('/profile/author', authorProfileRouter);

routes.use('/trainer', trainerRouter);
routes.use('/sessions/trainer', sessionsTrainerRouter);
routes.use('/profile/trainer', trainerProfileRouter);

routes.use('/student', studentRouter);
routes.use('/password/student', passwordRouter);
routes.use('/sessions/student', sessionsStudentRouter);
routes.use('/profile/student', studentProfileRouter);
routes.use('/physical-evaluation/student', studentPhysicalEvaluationRouter);

routes.use('/physical-evaluation', physicalEvaluationRouter);

routes.use('/matriculation', matriculationRouter);

export default routes;
