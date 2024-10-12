import { LocationEntetie } from 'App/Domain/Enteties/Location'
import { LocationRepository } from 'app/Domain/Repositories/LocationRepository'

export class FindByIdLocationUseCase {
  constructor(private locationRepository: LocationRepository) {}

  async execute(id: number): Promise<LocationEntetie[]> {
    return this.locationRepository.findById(id)
  }
}
