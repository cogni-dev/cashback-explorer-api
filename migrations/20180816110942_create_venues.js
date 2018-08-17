
exports.up = knex => knex.schema.createTable('venues', (table) => {
  table.increments().primary();
  table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()')).index();
  table.string('name');
  table.string('city').index();
  table.float('cashback');
  table.float('lat').notNullable();
  table.float('long').notNullable();
  table.integer('user_id').references('users.id').onDelete('CASCADE');
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('venues');
