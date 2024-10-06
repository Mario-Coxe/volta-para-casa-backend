import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Location from 'App/Models/Location'

import { CreateLocationUseCase } from 'app/Application/useCases/Locations/CreateLocationUseCase'
import { GetAllLocationsUseCase } from 'App/Application/useCases/Locations/GetAllLocationUseCase'
import { SearchMunicipeUseCase } from 'App/Application/useCases/Municipes/SearchMunicipeUseCase'
import { LocationRepositoryImpl } from '../Repositories/LocationRepositoryImpl'
import CreateLocationValidator from 'App/Validators/RegisterLocationValidator'


export default class LocationsController {

  private locationRepository: LocationRepositoryImpl


  constructor() {
    this.locationRepository = new LocationRepositoryImpl()
  }


  public async store({ request, response }: HttpContextContract) {
    const createLocationUseCase = new CreateLocationUseCase(this.locationRepository)
    const validatedData = await request.validate(CreateLocationValidator)
    const location = await createLocationUseCase.execute(validatedData)
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
