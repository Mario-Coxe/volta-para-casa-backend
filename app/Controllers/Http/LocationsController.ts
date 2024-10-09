import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { LocationRepositoryImpl } from '../Repositories/LocationRepositoryImpl'
import { CreateLocationUseCase } from 'App/Application/useCases/Locations/CreateLocationUseCase'
import { GetAllLocationsUseCase } from 'App/Application/useCases/Locations/GetAllLocationUseCase'
import { SearchLocationUseCase } from 'App/Application/useCases/Locations/SearchLocationUseCase'
import { FindByIdLocationUseCase } from 'App/Application/useCases/Locations/FindByIdLocationUseCase'
//import CreateLocationValidator from 'App/Validators/RegisterLocationValidator'

export default class LocationsController {
  private locationRepository: LocationRepositoryImpl

  constructor() {
    this.locationRepository = new LocationRepositoryImpl()
  }

  public async store({ request, response }: HttpContextContract) {
    const createLocationUseCase = new CreateLocationUseCase(this.locationRepository)
    //const validatedData = await request.validate(CreateLocationValidator)
    const data = request.only(['name', 'municipe_id', 'longitude', 'latitude'])

    console.log(data)

    const location = await createLocationUseCase.execute(data)
    return response.created({ message: 'Localização criada', location })
  }

  public async index({ request, response }: HttpContextContract) {
    console.log('texto 22')
    const getAllLocationsUseCase = new GetAllLocationsUseCase(this.locationRepository)
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const locations = await getAllLocationsUseCase.execute(limit, page)
    return response.ok(locations)
  }

  public async search({ request, response }: HttpContextContract) {
    const searchLocationUseCase = new SearchLocationUseCase(this.locationRepository)
    const name = request.input('name')
    const locations = await searchLocationUseCase.execute(name)
    return response.ok(locations)
  }

  public async show({ params, response }: HttpContextContract) {
    const id = params.id
    const findByIdLocationUseCase = new FindByIdLocationUseCase(this.locationRepository)
    const locations = await findByIdLocationUseCase.execute(id)
    return response.ok(locations)
  }
}
