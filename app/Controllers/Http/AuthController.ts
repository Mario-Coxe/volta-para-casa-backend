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
    try {
      const data = await request.validate(UsersRegisterValidator)

          const user = await User.create(data)
     // console.log("registado", user)
      return response.ok({ message: 'Usuário Registrado', user })
    } catch (error) {
      if (error.code === 'E_VALIDATION_FAILURE') {
        return response.status(400).send({
          message: 'Erro de validação. Por favor, verifique os dados enviados.',
          errors: error.messages,
        })
      }
      console.error('Erro ao registrar usuário:', error)
      return response.status(500).send({
        message: 'Erro inesperado ao registrar o usuário. Por favor, tente novamente mais tarde.',
        error: error.message,
      })
    }
  }
}
