import { container } from 'tsyringe';

import '@shared/container/providers';

import IAdminRepository from '@modules/admin/repositories/IAdminRepository';
import AdminRepository from '@modules/admin/infra/typeorm/repositories/AdminRepository';

import IAuthorRepository from '@modules/author/repositories/IAuthorRepository';
import AuthorRepository from '@modules/author/infra/typeorm/repositories/AuthorRepository';

import ITrainerRepository from '@modules/trainer/repositories/ITrainerRepository';
import TrainerRepository from '@modules/trainer/infra/typeorm/repositories/TrainerRepository';

import IStudentRepository from '@modules/student/repositories/IStudentRepository';
import StudentRepository from '@modules/student/infra/typeorm/repositories/StudentRepository';

import IStudentTokenRepository from '@modules/student/repositories/IStudentTokenRepository';
import StudentTokenRepository from '@modules/student/infra/typeorm/repositories/StudentTokenRepository';

import PhysicalEvaluationRepository from '@modules/physicalEvaluation/infra/typeorm/repositories/PhysicalEvaluationRepository';
import IPhysicalEvaluationRepository from '@modules/physicalEvaluation/repositories/IPhysicalEvaluationRepository';

import MatriculationRepository from '@modules/matriculation/infra/typeorm/repositories/MatriculationRepository';
import IMatriculationRepository from '@modules/matriculation/repositories/IMatriculationRepository';

import InventoryRepository from '@modules/inventory/infra/typeorm/repositories/InventoryRepository';
import IInventoryRepository from '@modules/inventory/repositories/IInventoryRepository';

import BudgetRepository from '@modules/budget/infra/typeorm/repositories/BudgetRepository';
import IBudgetRepository from '@modules/budget/repositories/IBudgetRepository';

import WorkoutRepository from '@modules/workout/infra/typeorm/repositories/WorkoutRepository';
import IWorkoutRepository from '@modules/workout/repositories/IWorkoutRepository';

import NewsRepository from '@modules/news/infra/typeorm/repositories/NewsRepository';
import INewsRepository from '@modules/news/repositories/INewsRepository';

container.registerSingleton<IAdminRepository>(
  'AdminRepository',
  AdminRepository,
);
container.registerSingleton<IAuthorRepository>(
  'AuthorRepository',
  AuthorRepository,
);
container.registerSingleton<ITrainerRepository>(
  'TrainerRepository',
  TrainerRepository,
);
container.registerSingleton<IStudentRepository>(
  'StudentRepository',
  StudentRepository,
);
container.registerSingleton<IStudentTokenRepository>(
  'StudentTokenRepository',
  StudentTokenRepository,
);
container.registerSingleton<IPhysicalEvaluationRepository>(
  'PhysicalEvaluationRepository',
  PhysicalEvaluationRepository,
);
container.registerSingleton<IMatriculationRepository>(
  'MatriculationRepository',
  MatriculationRepository,
);
container.registerSingleton<IInventoryRepository>(
  'InventoryRepository',
  InventoryRepository,
);

container.registerSingleton<IBudgetRepository>(
  'BudgetRepository',
  BudgetRepository,
);

container.registerSingleton<IWorkoutRepository>(
  'WorkoutRepository',
  WorkoutRepository,
);

container.registerSingleton<INewsRepository>('NewsRepository', NewsRepository);
