import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Province from './Province'
export default class Municipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public province_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
