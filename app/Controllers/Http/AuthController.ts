import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersRegisterValidator from 'App/Validators/UsersRegisterValidator'
import User from 'App/Models/User'
export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { phone_number, password } = request.all()
    const token = await auth.use('api').attempt(phone_number, password, {})
    const user = auth.user!
    return response.ok({ token, user, message: 'Login Efectuado Com Sucesso' })
  }

  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(UsersRegisterValidator)
    const user = await User.create(data)
    return response.ok({ message: 'Usuário Registrado', user })
  }
}
