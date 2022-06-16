
module.exports = {
  "name": "default",
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": {
    rejectUnauthorized: false,
  },
  "entities":[`./${process.env.BASE_URL_DEV}/modules/**/infra/typeorm/entities/*.js`],
  "migrations": [`./${process.env.BASE_URL_DEV}/shared/infra/typeorm/migrations/*.js`],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
