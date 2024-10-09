import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Municipe from './Municipe'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public: string

  @column()
  public latitude: string

  @column()
  public longitude: string

  @column()
  public municipe_id: number

  @belongsTo(() => Municipe, {
    foreignKey: 'municipe_id',
    localKey: 'id',
  })
  public municipe: BelongsTo<typeof Municipe>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
