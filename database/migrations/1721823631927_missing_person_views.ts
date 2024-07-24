import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MissingPersonViews extends BaseSchema {
  protected tableName = 'missing_person_views'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('missing_person_id').unsigned().notNullable().references('id').inTable('missing_persons')
      table.integer('user_id').unsigned().nullable().references('id').inTable('users')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
