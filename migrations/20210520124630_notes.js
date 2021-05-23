
exports.up = function(knex) {
  return knex.schema.createTable('notes',(table)=>{
      table.increments();
      table.integer('user_id');
      table.string('title');
      table.string('content');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
