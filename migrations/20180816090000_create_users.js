
exports.up = knex => knex.schema.createTable('users', (table) => {
  table.increments().primary();
  table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()')).index();
  table.string('name');
  table.string('email').unique();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');
