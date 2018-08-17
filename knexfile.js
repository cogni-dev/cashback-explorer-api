// Update with your config settings.

const baseSettings = connection => ({
  client: 'postgresql',
  connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
});

module.exports = {

  development: baseSettings({
    database: 'cashback_explorer-development',
    user: 'user',
    password: '',
  }),

  test: baseSettings({
    database: 'cashback_explorer-test',
    user: process.env.PGUSER || 'user',
    password: process.env.PGPASSWORD || '',
  }),

  production: baseSettings(process.env.DATABASE_URL),
};
