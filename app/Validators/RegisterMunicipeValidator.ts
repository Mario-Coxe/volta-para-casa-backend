import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateMunicipeValidator {
  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({ table: 'municipes', column: 'name' }),
    ]),
    province_id: schema.number([
      rules.exists({ table: 'provinces', column: 'id' }),
    ]),
  })

  public messages = {
    'name.required': 'O nome é obrigatório',
    'name.unique': 'O nome deve ser único',
    'province_id.required': 'O ID da província é obrigatório',
    'province_id.exists': 'A província especificada não existe',
  }
}
