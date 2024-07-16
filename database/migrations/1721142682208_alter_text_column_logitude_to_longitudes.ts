import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('logitude', 'longitude')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('logitude', 'longitude')
    })
  }
}
