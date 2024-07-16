import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipe from 'App/Models/Municipe'
import CreateMunicipeValidator from 'App/Validators/RegisterMunicipeValidator'

export default class MunicipesController {
  public async store({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(CreateMunicipeValidator)
    const municipe = await Municipe.create(validatedData)
    return response.ok({ message: 'Município Registado', municipe })
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const municipes = await Municipe.query().paginate(page, limit)
    return response.ok(municipes)
  }
}
