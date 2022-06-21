export default {
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    `./${process.env.BASE_URL_DEV}/modules/**/infra/typeorm/entities/*.ts`,
  ],
  migrations: [
    `./${process.env.BASE_URL_DEV}/shared/infra/typeorm/migrations/*.ts`,
  ],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
