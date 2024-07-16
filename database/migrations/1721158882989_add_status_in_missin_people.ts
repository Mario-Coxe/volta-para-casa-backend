import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'missing_persons'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('status_id').unsigned().notNullable().defaultTo(1).references('id').inTable('estado_missing_people').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('status_id')
    })
  }
}
