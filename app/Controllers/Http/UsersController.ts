import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class UsersController {
  public async updateProfile({ request, auth, response }: HttpContextContract) {
    const user = auth.user!
    if (!user) {
      return response.status(401).send({ message: 'Usuário não autenticado' })
    }
    const data = request.only(['full_name', 'phone_number'])
    user.merge(data)
    await user.save()
    return response.ok({ message: 'Perfil actualizado com sucesso', user })

  }
}
