import { ConnectionOptions } from 'typeorm';

import { config } from 'dotenv';
import defaultConnection from './ormconfig';

config();

const Connection: ConnectionOptions = {
  ...defaultConnection,
  migrations: [__dirname + '/src/shared/infra/database/seeds/*{.js,.ts}'],
  cli: {
    entitiesDir: __dirname + '/src/tmp',
    migrationsDir: __dirname + '/src/shared/infra/database/seeds',
    subscribersDir: __dirname + '/src/shared/infra/database/subscribers',
  },
};

export = Connection;
