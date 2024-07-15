import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Province from 'App/Models/Province'

export default class ProvincesController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const provinces = await Province.query().orderBy('created_at', 'desc').paginate(page, limit)
    return response.json(provinces)
  }
}
