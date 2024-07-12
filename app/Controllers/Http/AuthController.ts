import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { phone_number, password } = request.all()
    try {
      const token = await auth.use('api').attempt(phone_number, password, {})
      const user = auth.user!
      return response.ok({ token, user, message: 'Login Efectuado Com Sucesso'  })
    } catch (error) {
      console.error(error)
      return response.unauthorized('Credenciais inválidas', error)
    }
  }
}
