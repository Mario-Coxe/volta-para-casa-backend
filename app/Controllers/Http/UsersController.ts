import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
export default class UsersController {

  public async updateProfile({ request, auth, response }: HttpContextContract) {
    try {
      const user = auth.user!
      console.log(user)
      if (!user) {
        return response.status(401).send({ message: 'Usuário não autenticado' })
      }
      const data = request.only(['full_name', 'phone_number'])
      user.merge(data)
      await user.save()
      return response.ok({ message: 'Perfil atualizado com sucesso', user })
    } catch (error) {
      console.error(error)
      return response.status(400).send({ message: 'Erro ao atualizar perfil', error })
    }
  }
}
