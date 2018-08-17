
exports.up = knex => knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

exports.down = () => Promise.resolve();
