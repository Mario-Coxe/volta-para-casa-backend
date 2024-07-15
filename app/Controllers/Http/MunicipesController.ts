import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipe from 'App/Models/Municipe'
export default class MunicipesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { name, province_id } = request.all()
      const municipe = await Municipe.create({ name, province_id })
      return response.ok({ message: 'Município Registado', municipe })
    } catch (error) {
      return response.status(400).send({ message: 'Erro ao cadastrar município', error })
    }
  }
}
