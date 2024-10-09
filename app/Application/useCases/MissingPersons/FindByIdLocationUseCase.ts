import { Location } from 'App/Domain/Enteties/Location'
import { LocationRepository } from 'app/Domain/Repositories/LocationRepository'

export class FindByIdLocationUseCase {
  constructor(private locationRepository: LocationRepository) {}

  async execute(id: number): Promise<Location[]> {
    return this.locationRepository.findById(id)
  }
}
