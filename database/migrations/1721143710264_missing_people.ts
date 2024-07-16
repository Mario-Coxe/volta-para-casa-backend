import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MissingPersons extends BaseSchema {
  protected tableName = 'missing_persons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.integer('age').notNullable()
      table.string('gender').notNullable()
      table.string('last_location').notNullable()
      table.integer('registered_by').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.text('description').notNullable()
      table.string('first_photo').notNullable()
      table.string('second_photo').nullable()
      table.string('third_photo').nullable()
      table.string('fourth_photo').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
