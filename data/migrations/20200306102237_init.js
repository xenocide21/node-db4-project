exports.up = async function(knex) {
    await knex.schema
        .createTable('recipes', table => {
            table.increments()
            table.string('recipeName').notNullable().index()
            table.text('instructions').notNullable()
        })

        .createTable('ingredients', table => {
            table.increments();
            table.string('ingredientName').notNullable().index()
        })

        .createTable('recipes_ingredients', table => {
            table.increments();
            table.integer('recipe_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('recipes')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')

            table.integer('ingredient_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('ingredients')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')

            table.float('quantity')
                .unsigned()
                .notNullable();

        })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('recipes_ingredients')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipes')
};