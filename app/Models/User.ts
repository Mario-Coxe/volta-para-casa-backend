import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, beforeSave, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Municipe from './Municipe';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public full_name: string

  @column()
  public phone_number: string

  @column()
  public municipe_id: number


  @belongsTo(() => Municipe, {
    foreignKey: '',
    localKey: 'id'
  })
  public municipe: BelongsTo<typeof Municipe>


  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
