/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("transactions", (table) => {
      table.increments("id").primary();
      table.integer("wallet_id").unsigned().notNullable();
      table.enum("type", ['credit', 'debit']).notNullable();
      table.enum("action", ['deposit', 'transfer', 'withdrawal']).notNullable();
      table.decimal("amount", 25, 2).defaultTo(0).notNullable();
      table.text("description").notNullable();
      table.json("extra").notNullable();
      table.integer("receiving_wallet_id").unsigned().nullable();
      table.foreign('wallet_id').references('wallets.id');
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("transactions");
  };
