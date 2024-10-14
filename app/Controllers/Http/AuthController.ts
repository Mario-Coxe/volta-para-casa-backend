import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import UsersRegisterValidator from 'App/Validators/UsersRegisterValidator'
import User from 'App/Models/User'
import Municipe from 'App/Models/Municipe'
export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { phone_number, password } = request.all()
    const token = await auth.use('api').attempt(phone_number, password, {})
    const user = auth.user!
    return response.ok({ token, user, message: 'Login Efectuado Com Sucesso' })
  }

  public async register({ request, response }: HttpContextContract) {
    const data = request.only(['full_name', 'phone_number', 'password', 'municipe_id'])
    const errors: string[] = []
    if (!data.full_name) {
      errors.push('O nome completo é obrigatório.')
    } else if (data.full_name.length > 255) {
      errors.push('O nome completo não pode ter mais de 255 caracteres.')
    }
    if (!data.phone_number) {
      errors.push('O número de telefone é obrigatório.')
    } else {
      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g
      if (!phoneRegex.test(data.phone_number)) {
        errors.push('O número de telefone deve ser válido.')
      }
      const existingUser = await User.findBy('phone_number', data.phone_number)
      if (existingUser) {
        errors.push('Já existe um usuário com este número.')
      }
    }
    if (!data.password) {
      errors.push('A senha é obrigatória.')
    } else if (data.password.length < 6 || data.password.length > 20) {
      errors.push('A senha deve ter entre 6 e 20 caracteres.')
    } else {
      const passwordRegex = /^[a-zA-Z0-9]+$/
      if (!passwordRegex.test(data.password)) {
        errors.push('A senha deve conter apenas letras e números.')
      }
    }
    if (!data.municipe_id) {
      errors.push('O município é obrigatório.')
    } else {
      const municipeExists = await Municipe.find(data.municipe_id)
      if (!municipeExists) {
        errors.push('O município selecionado não é válido.')
      }
    }
    if (errors.length > 0) {
      return response.badRequest({ message: 'Erro de validação', errors })
    }
    const user = await User.create(data)
    return response.ok({ message: 'Usuário Registrado', user })
  }
}
