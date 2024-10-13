import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddDisappearanceDateToMissingPersons extends BaseSchema {
  protected tableName = 'missing_persons'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.timestamp('disappearance_date').nullable().after('last_location')
      table
        .integer('municipe_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('municipes')
        .onDelete('CASCADE')
        .after('gender')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('disappearance_date')
      table.dropColumn('municipe_id')
    })
  }
}
