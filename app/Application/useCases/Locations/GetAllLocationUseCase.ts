import { Location } from 'App/Domain/Enteties/Location'
import { LocationRepository } from 'app/Domain/Repositories/LocationRepository'

export class GetAllLocationsUseCase {
  constructor(private locationRepository: LocationRepository) { }

  async execute(limit: number, page: number): Promise<Location[]> {
    return this.locationRepository.findAll(limit, page)
  }
}
