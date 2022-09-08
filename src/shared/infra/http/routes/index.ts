import { Router } from 'express';

import passwordRouter from '@modules/student/infra/http/routes/password.routes';

import sessionsAdminRouter from '@modules/admin/infra/http/routes/sessions.routes';

import authorRouter from '@modules/author/infra/http/routes/author.routes';
import sessionsAuthorRouter from '@modules/author/infra/http/routes/sessionsAuthor.routes';
import authorProfileRouter from '@modules/author/infra/http/routes/authorProfile.routes';
import authorPresentationRouter from '@modules/author/infra/http/routes/authorPresentation.routes';

import trainerRouter from '@modules/trainer/infra/http/routes/trainer.routes';
import sessionsTrainerRouter from '@modules/trainer/infra/http/routes/sessionsTrainer.routes';
import trainerProfileRouter from '@modules/trainer/infra/http/routes/trainerProfile.routes';

import studentRouter from '@modules/student/infra/http/routes/student.routes';
import sessionsStudentRouter from '@modules/student/infra/http/routes/sessionsStudent.routes';
import studentProfileRouter from '@modules/student/infra/http/routes/studentProfile.routes';

import physicalEvaluationRouter from '@modules/physicalEvaluation/infra/http/routes/physicalEvaluation.routes';
import studentPhysicalEvaluationRouter from '@modules/physicalEvaluation/infra/http/routes/studentPhysicalEvaluation.routes';

import matriculationRouter from '@modules/matriculation/infra/http/routes/matriculation.routes';

import inventoryRouter from '@modules/inventory/infra/http/routes/inventory.routes';

import budgetRouter from '@modules/budget/infra/http/routes/budget.routes';

import workoutRouter from '@modules/workout/infra/http/routes/workout.routes';
import workoutsOfTheWeekRouter from '@modules/workout/infra/http/routes/workoutsOfTheWeek.routes';

import newsRouter from '@modules/news/infra/http/routes/news.routes';
import newsMostAccessedRouter from '@modules/news/infra/http/routes/newsMostAccessed.routes';
import newsProfileAuthorRouter from '@modules/news/infra/http/routes/newsProfileAuthor.routes';

import questionRouter from '@modules/student/infra/http/routes/question.routes';

const routes = Router();

routes.use('/sessions/admin', sessionsAdminRouter);

routes.use('/author', authorRouter);
routes.use('/sessions/author', sessionsAuthorRouter);
routes.use('/profile/author', authorProfileRouter);
routes.use('/presentation/author', authorPresentationRouter);

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

routes.use('/inventory', inventoryRouter);

routes.use('/budget', budgetRouter);

routes.use('/workout', workoutRouter);
routes.use('/workouts/week', workoutsOfTheWeekRouter);

routes.use('/news/access-counter', newsMostAccessedRouter);
routes.use('/news/profile/author', newsProfileAuthorRouter);
routes.use('/news', newsRouter);

routes.use('/question', questionRouter);

export default routes;
