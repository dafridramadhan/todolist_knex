/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('todolists', table => {
    table.bigIncrements('id');
    table.bigint('user_id').references('id').inTable('users').unsigned();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
