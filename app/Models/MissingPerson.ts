import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import StateMissingPerson from './EstadoMissingPerson'
import Municipe from './Municipe'

export default class MissingPerson extends BaseModel {
  public static table = 'missing_persons'
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public age: number

  @column()
  public gender: string

  @column()
  public last_location: string

  @column()
  public registered_by: number

  @column()
  public status_id: number

  @column()
  public municipe_id: number

  @belongsTo(() => User, {
    foreignKey: 'registered_by',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => StateMissingPerson, {
    foreignKey: 'status_id',
    localKey: 'id',
  })
  public status: BelongsTo<typeof StateMissingPerson>

  @belongsTo(() => Municipe, {
    foreignKey: 'municipe_id',
    localKey: 'id',
  })
  public municipe: BelongsTo<typeof Municipe>

  @column()
  public description: string

  @column()
  public first_photo: string

  @column()
  public second_photo: string | null

  @column()
  public third_photo: string | null

  @column()
  public fourth_photo: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({})
  public disappearance_date: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
