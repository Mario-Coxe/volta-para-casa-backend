import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import UsersRegisterValidator from 'App/Validators/UsersRegisterValidator'
export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UsersRegisterValidator)
      const user = await User.create(data)
      return response.status(200).send({ user, message: 'Usuário Cadastrado' })
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao cadastrar usuário', error })
    }
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    const token = await auth.use('api').attempt(email, password)
    return response.ok({ token })
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const { email, newPassword } = request.only(['email', 'newPassword'])
    const user = await User.findByOrFail('email', email)
    user.password = await Hash.make(newPassword)
    await user.save()
    return response.ok({ message: 'Password reset successfully' })
  }
}
