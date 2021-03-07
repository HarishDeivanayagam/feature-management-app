import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs";

const config: MikroOrmModuleSyncOptions = {
  entities: ['./dist/database/models/*.model.js'],
  entitiesTs: ['./src/database/models/*.model.ts'],
  type: 'postgresql',
  clientUrl: 'http://139.180.156.248:5432',
  user: 'postgres',
  password: 'root',
  dbName: 'fmapi',
  migrations: {
    tableName: 'migrations',
    path: './src/database/migrations',
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
};

export default config;
