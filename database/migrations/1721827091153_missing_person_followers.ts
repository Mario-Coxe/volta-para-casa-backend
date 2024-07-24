import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MissingPersonFollowers extends BaseSchema {
  protected tableName = 'missing_person_followers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('missing_person_id').unsigned().notNullable().references('id').inTable('missing_persons')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.timestamps(true, true)
      table.unique(['missing_person_id', 'user_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
