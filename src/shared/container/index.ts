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
import StudentTokenRepository from '@modules/student/infra/typeorm/repositories/StudentTokenRepository'

container.registerSingleton<IAdminRepository>('AdminRepository', AdminRepository);
container.registerSingleton<IAuthorRepository>('AuthorRepository', AuthorRepository);
container.registerSingleton<ITrainerRepository>('TrainerRepository', TrainerRepository);
container.registerSingleton<IStudentRepository>('StudentRepository', StudentRepository);
container.registerSingleton<IStudentTokenRepository>('StudentTokenRepository', StudentTokenRepository);
