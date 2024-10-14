import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddDisappearanceDateToMissingPersons extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table
        .integer('municipe_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('municipes')
        .onDelete('CASCADE')
        .after('phone_number')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('municipe_id')
    })
  }
}
