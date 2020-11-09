import { ConnectionOptions } from 'typeorm';

import { config } from 'dotenv';

config();

const Connection: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/src/modules/**/infra/typeorm/entities/*{.js,.ts}'],
  migrations: [__dirname + '/src/shared/infra/database/migrations/*{.js,.ts}'],
  cli: {
    entitiesDir: __dirname + '/src/tmp',
    migrationsDir: __dirname + '/src/shared/infra/database/migrations',
    subscribersDir: __dirname + '/src/shared/infra/database/subscribers',
  },
};

export = Connection;
