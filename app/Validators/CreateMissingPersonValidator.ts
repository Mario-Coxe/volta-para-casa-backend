import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CreateMissingPersonValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    age: schema.number(),
    gender: schema.enum(['Masculino', 'Femenino', 'other']),
    last_location: schema.string({ trim: true }, [
      rules.maxLength(255),
    ]),
    description: schema.string({ trim: true }),
    registered_by: schema.number([
      rules.exists({ table: 'users', column: 'id' })
    ]),
    first_photo: schema.string.optional({ trim: true }, [
      rules.url(),
    ]),
  })

  public messages = {
    'name.required': 'O nome é obrigatório',
    'age.required': 'A idade é obrigatória',
    'gender.required': 'O gênero é obrigatório',
    'last_location.required': 'A última localização é obrigatória',
    'description.required': 'A descrição é obrigatória',
    //'registered_by.required': 'O ID do usuário que registrou é obrigatório',
    'registered_by.exists': 'O ID do usuário que registrou deve existir na tabela de usuários',
    'first_photo.required': 'A foto é obrigatória',
  }
}
