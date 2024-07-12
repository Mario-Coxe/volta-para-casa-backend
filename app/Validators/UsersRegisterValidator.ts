import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersRegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    full_name: schema.string({}, [rules.required(), rules.maxLength(255)]),
    phone_number: schema.string({}, [
      rules.required(),
      rules.mobile(),
      rules.unique({
        table: 'users',
        column: 'phone_number',
        caseInsensitive: true,
      }),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(6),
      rules.maxLength(20),
      rules.regex(/[a-zA-Z0-9]/),
    ]),
  })

  public messages: CustomMessages = {
    'full_name.required': 'O nome completo é obrigatório.',
    'full_name.maxLength': 'O nome completo não pode ter mais de 255 caracteres.',
    'phone_number.required': 'O número de telefone é obrigatório.',
    'phone_number.mobile': 'O número de telefone deve ser um número de telefone válido.',
    'phone_number.unique': 'Já existe um usário com este número.',
    'password.required': 'A senha é obrigatória.',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres.',
    'password.maxLength': 'A senha deve ter no máximo 20 caracteres.',
    'password.regex': 'A senha deve conter apenas letras maiúsculas, minúsculas e números.',
  }
}
