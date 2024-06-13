/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("firstname", 100).notNullable();
    table.string("lastname", 100).notNullable();
    table.string("email", 100).unique().notNullable();
    table.string("phone", 20).notNullable();
    table.string("password", 255).notNullable();
    table.enum("status", [0, 1, 2]).defaultTo(1).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
