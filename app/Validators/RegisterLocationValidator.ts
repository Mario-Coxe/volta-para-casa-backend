import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateLocationValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    longitude: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    latitude: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    municipe_id: schema.number([
      rules.exists({ table: 'municipes', column: 'id' })
    ]),
  })

  public messages = {
    'name.required': 'O nome é obrigatório',
    'longitude.required': 'A longitude é obrigatória',
    'latitude.required': 'A latitude é obrigatória',
    'municipe_id.required': 'O ID do municipe é obrigatório',
    'municipe_id.exists': 'O ID do municipe deve existir na tabela de municipes'
  }
}
