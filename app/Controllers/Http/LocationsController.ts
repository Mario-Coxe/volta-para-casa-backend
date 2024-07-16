import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Location from 'App/Models/Location'
import CreateLocationValidator from 'App/Validators/RegisterLocationValidator'
export default class LocationsController {
  public async store({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(CreateLocationValidator)
    const location = await Location.create(validatedData)
    return response.created({ message: 'Localização criada', location })
  }

  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const locations = await Location.query()
      .preload('municipe', (query) => {
        query.preload('province')
      })
      .paginate(page, limit)

    return response.ok(locations)
  }

  public async show({ params, response }: HttpContextContract) {
    const location = await Location.findOrFail(params.id)
    await location.load('municipe')
    return response.ok(location)
  }
}
