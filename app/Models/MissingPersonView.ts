import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import MissingPerson from './MissingPerson'

export default class MissingPersonView extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public missingPersonId: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => MissingPerson)
  public missingPerson: BelongsTo<typeof MissingPerson>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
