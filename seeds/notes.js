
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, user_id: 1,title:'shopping List',content:'This is a shopping list'},
        {id: 2, user_id: 1,title:'Monday agenda',content:'This is a agenda'},
        {id: 3, user_id: 1,title:'little notes',content:'I just cannot focus'}
      ]);
    });
};
